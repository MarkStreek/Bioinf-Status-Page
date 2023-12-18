
async function retrieveData() {
    let response = await fetch("data/config.json");
    let data = await response.json();

    let rooms = Object.entries(data.data.room);
    return rooms.reduce((acc, [room, roomData]) => {
        let pcs = roomData.pc;
        pcs.forEach(pc => acc.push({workstation: pc, room: room}));
        return acc;
    }, []);
}

function handling() {
    retrieveData().then(AllPCS => {
        AllPCS.forEach(createWorkStationDiv)
    });
}

function showHideAllElements(status) {
    let divs = document.querySelectorAll("[class^='col Room_']");
    divs.forEach(function(div) {
        div.style.display = status;
    });
}

// Initial function call to show all elements

let checkboxes = document.querySelectorAll("input[type='checkbox']");
checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        checkboxes.forEach(function(checkbox) {
            let cardID = 'Room_' + checkbox.id;
            let divs = document.getElementsByClassName("col " + cardID);
            mapID = document.getElementById("Map");
            for (let div of divs) {
                if (mapID.checked === true && checkbox.checked === true) {
                    updateElement(checkbox.id);
                }
                if (checkbox.checked === true) {
                    div.style.display = 'block';
                } else {
                    div.style.display = 'none';
                }
            }

        });
        let status = [];
        checkboxes.forEach(function(checkbox) {
            status.push(checkbox.checked);
        });
        if (!status.includes(true)) {
            showHideAllElements('block');
        }
    });
});

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

function smallDiv(server, room) {
    let chooseRandomStatus = ['ONLINE', 'OFFLINE'][Math.floor(Math.random() * 2)];

    let newDivMain = document.createElement('div');
    newDivMain.classList.add('col');
    newDivMain.setAttribute("id", server);
    // newDivMain.style.width = '75%';

    let newDiv1 = document.createElement('div');
    newDiv1.classList.add('card', 'border-2');
    newDiv1.style.backgroundColor = `#4a5766`;
    if (chooseRandomStatus === "ONLINE") {
        newDiv1.style.borderColor = `#3cb371`;
    } else {
        newDiv1.style.borderColor = `#ff0000`;
    }

    let pcTitle = document.createElement('h4');
    pcTitle.textContent = `${server.split('.')[0]}`;
    pcTitle.style.color = `#ffffff`;

    newDiv1.appendChild(pcTitle);
    newDivMain.appendChild(newDiv1);

    return newDivMain;
}

let serverState = {
    currentServerIndex: 0
};


function getAllPCs(selectedRoom, data) {
    let servers = data.data.room[selectedRoom]
    if (serverState.currentServerIndex < servers.pc.length) {
        let server = servers.pc[serverState.currentServerIndex];
        serverState.currentServerIndex++;

        return server;
    } else {
        // Move to the next room and reset the server index
        serverState.currentServerIndex = 0;
    }

    // No more servers left
    return null;

}

setInterval(function () {
    void handlingUpdate();
}, 5000);

// Calling the handling function, that starts the whole process
handling();

