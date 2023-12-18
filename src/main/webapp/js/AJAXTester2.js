/*

ID's of the elements:
    1. ONLINE/OFFLINE span: "nuc001.bin.bioinf.nl_status"
    2. Modal instance name: "nuc001.bin.bioinf.nl_instanceName"
    3. Modal current load: "nuc001.bin.bioinf.nl_load"
    4. Modal currnet free memory: "nuc001.bin.bioinf.nl_currentFreeMemory"
    5. Modal free memory last 5 minutes: "nuc001.bin.bioinf.nl_freeMemoryLast5Minutes"
    6. Modal temperature: "nuc001.bin.bioinf.nl_temperature"
    7. NewDiv1/Card: "nuc001.bin.bioinf.nl_card" (We need this element to change the border color depending on the status)
    8. Img/logo: "nuc001.bin.bioinf.nl_img" (We need this element to change the logo depending on the status)
 */


async function updateElement(selectedRoom) {
    try {
        let response = await fetch("data/config.json");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();


        // let selectedRooms = getSelectedRooms() || Object.keys(data.data.room);
        let searchRoom = data.data.room[selectedRoom];
        let serversDiv = document.getElementById("innerDiv");

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
    newDiv1.classList.add('card', 'border-1');
    if (chooseRandomStatus === "ONLINE") {
        newDiv1.style.backgroundColor = `#3cb371`;
    } else {
        newDiv1.style.backgroundColor = `#ff0000`;
    }

    let pcTitle = document.createElement('h4');
    pcTitle.textContent = `Server ${server.split('.')[0]}`;

    newDiv1.appendChild(pcTitle);
    newDivMain.appendChild(newDiv1);

    return newDivMain;
}

let serverState = {
    currentRoomIndex: 0,
    currentServerIndex: 0
};

function getNextServer(selectedRooms, data) {
    while (serverState.currentRoomIndex < selectedRooms.length) {
        let room = selectedRooms[serverState.currentRoomIndex];
        console.log(room);
        let servers = data.data.room[room]
        if (serverState.currentServerIndex < servers.pc.length) {
            let server = servers.pc[serverState.currentServerIndex];
            serverState.currentServerIndex++;

            return { server, room};
        } else {
            // Move to the next room and reset the server index
            serverState.currentRoomIndex++;
            serverState.currentServerIndex = 0;
        }
    }

    // No more servers left
    return null;
}

function getAllPCs(selectedRoom, data) {
    let servers = data.data.room[selectedRoom]
    if (serverState.currentServerIndex < servers.pc.length) {
        let server = servers.pc[serverState.currentServerIndex];
        serverState.currentServerIndex++;

        return server;
    } else {
        // Move to the next room and reset the server index
        serverState.currentRoomIndex++;
        serverState.currentServerIndex = 0;
    }

    // No more servers left
    return null;

}

function getSelectedRooms() {
    let checkboxes = document.querySelectorAll('input[name="room"]:checked');
    let rooms = Array.from(checkboxes).map(cb => cb.value);
    return rooms.length > 0 ? rooms : null;
}

// Event listeners
// document.addEventListener('DOMContentLoaded', updateElement);
// document.querySelectorAll('input[name="room"]').forEach(cb => {
//     cb.addEventListener('change', updateElement);
// });


// setTimeout(function (){
//
//     document.getElementById("nuc001.bin.bioinf.nl_load").innerText = "DEZE TEKTS IS VERANDERD";
// }, 500);


