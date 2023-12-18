async function handlingUpdate() {
    let responseRequest = await fetch("/requestListener");
    let data = await responseRequest.json();

    let responseConfigData = await fetch("data/config.json");
    let configData = await responseConfigData.json();

    let sortedData = sortObjects(data);
    let slicedArray = sortedData.slice(0, 4);

    console.log("Updating the data...")

    const rooms = Object.values(configData.data.room);
    const allPcs = rooms.reduce((acc, roomData) => acc.concat(roomData.pc), []);
    for (let i = 0; i < data.length; i++) {
        updateContent(data[i], allPcs);
    }

    void createSuggestions(slicedArray);
}

async function configFileToHashMap() {

    let allPcs = await retrieveData();
    return allPcs.reduce((acc, item) => {
        acc[item.workstation] = item.room;
        return acc;
    }, {});

}

function updateContent(data, allPcs) {

    // Defining the instance name
    let instance = data.instance;

    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            if (allPcs.includes(instance)) {
                if (key === "isUP") {
                    if (data[key] === true) {
                        document.getElementById(data.instance + "_status").style.color = `#3cb371`;
                        document.getElementById(data.instance + "_status").innerText = "ONLINE";
                        document.getElementById(data.instance + "_card").style.borderColor = `#3cb371`;
                        document.getElementById(data.instance + "_img").setAttribute("src", "../../images/logo_ONLINE.png");
                    }
                } else if (key === "currentLoad") {
                    document.getElementById(instance + "_load").innerText = "Current load: " + data[key];
                    document.getElementById(instance + "_loadDirect").innerText = "Current load: " + data[key];
                } else if (key === "currentFreeMemory") {
                    document.getElementById(instance + "_currentFreeMemory").innerText = "Current free memory: " + data[key];
                } else if (key === "currentLoad5") {
                    document.getElementById(instance + "_loadlast5").innerText = "Load of the last 5 minutes: " + data[key];
                } else if (key === "currentAvailableMemory") {
                    document.getElementById(instance + "_availableMemory").innerText = "Current Available memory: " + data[key];
                } else if (key === "temperature") {
                    document.getElementById(instance + "_temperature").innerText = "Temperature: " + data[key];
                }
            }
        }
    }
}

async function updateElement(selectedRoom) {
    try {
        let response = await fetch("data/config.json");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();


        // let selectedRooms = getSelectedRooms() || Object.keys(data.data.room);
        let searchRoom = data.data.room[selectedRoom];
        let serversDiv = document.getElementById("innerdiv");

        serversDiv.innerHTML = ''; // Clear the div
        serversDiv.classList.add('grid-container');
        serversDiv.style.width = '80%';
        serversDiv.style.margin = 'auto';

        for (let row of searchRoom.classRoomMatrix) {
            for (let cell of row) {
                let newDivMain = document.createElement('div');
                newDivMain.classList.add('col');
                newDivMain.style.width = '16%';

                if (cell === 'pc') {
                    let serverInfo = getAllPCs(selectedRoom, data); // You need to implement this function
                    if (serverInfo) {
                        let serverDiv = smallDiv(serverInfo, selectedRoom);
                        newDivMain.appendChild(serverDiv);
                    }
                }

                serversDiv.appendChild(newDivMain);
            }
        }

        await handling();
    } catch (error) {
        console.error('Error fetching config data: ', error);
    }
}

async function createSuggestions(instances) {

    let hashmap = await configFileToHashMap();

    while (document.getElementById("suggestions").children.length !== 0) {
        for (let node of document.getElementById("suggestions").children) {
            node.className = "col Room_" + hashmap[node.id]
            document.getElementById("innerdiv").appendChild(node);
        }
    }

    for (let suggestion of instances) {
        let add = document.getElementById(suggestion.instance);
        add.className = "col";
        document.getElementById("suggestions").appendChild(document.getElementById(suggestion.instance));
    }


}

function sortObjects(objects) {
    return objects.sort((a, b) => {
        const loadA = a.currentLoad ? parseFloat(a.currentLoad) : Number.MAX_VALUE;
        const loadB = b.currentLoad ? parseFloat(b.currentLoad) : Number.MAX_VALUE;
        const memA = a.currentAvailableMemory ? parseFloat(a.currentAvailableMemory) : Number.MAX_VALUE;
        const memB = b.currentAvailableMemory ? parseFloat(b.currentAvailableMemory) : Number.MAX_VALUE;
        const tempA = a.temperature ? a.temperature.slice(0, -1) : null;
        const tempB = b.temperature ? b.temperature.slice(0, -1) : null;

        const isUP_A = a.isUP || false;
        const isUP_B = b.isUP || false;

        if (isUP_A && isUP_B) {
            if (loadA !== loadB) {
                return loadA - loadB;
            } else if (memA !== memB) {
                return memA - memB;
            } else {
                if (tempA && tempB) {
                    return tempA.localeCompare(tempB);
                } else if (tempA && !tempB) {
                    return -1;
                } else if (!tempA && tempB) {
                    return 1;
                } else {
                    return 0;
                }
            }
        } else if (isUP_A) {
            return -1; // Move object with isUP true towards the beginning
        } else if (isUP_B) {
            return 1; // Move object with isUP true towards the end
        } else {
            return 0; // Both objects have isUP as false or undefined, keep their order unchanged
        }
    });
}
