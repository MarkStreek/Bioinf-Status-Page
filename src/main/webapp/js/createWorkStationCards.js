
function mapDiv() {
    // Create the necessary elements
    let containerDiv = document.createElement('div');
    containerDiv.classList.add('container', 'text-centre');

    let rowDiv = document.createElement('div');
    rowDiv.classList.add('row', 'row-cols-2', 'row-cols-md-5', 'row-cols-lg-10', 'g-1');
    rowDiv.id = 'mapdiv'; // Set the ID

// Append the rowDiv to the containerDiv
    containerDiv.appendChild(rowDiv);

// Append the containerDiv to the body or any other existing element
    document.body.appendChild(containerDiv); // Example: Append to the body
}

// for map checkbox display
function smallDiv(server) {
    let newDivMain = document.createElement('div');
    newDivMain.classList.add('col', '_map');
    newDivMain.setAttribute("id", server);

    let newDiv1 = document.createElement('div');
    newDiv1.classList.add('card', 'border-2');
    newDiv1.id = server + '_map';
    newDiv1.style.backgroundColor = `#4a5766`;
    newDiv1.style.borderColor = `#ff0000`;

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
    // create a function that loops over all pcs for given room, then splits them into a label and adds the label to a list. functon returns all labels of a room
    let pcLabels = [];
    for (let i = 0; i < servers.pc.length; i++) {
        let server = servers.pc[i];
        pcLabels.push(server);
    }
    return pcLabels;

}


async function updateElement(selectedRoom) {

    try {
        let response = await fetch("data/config.json");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        let searchRoom = data.data.room[selectedRoom];
        let mapDiv = document.getElementById("mapdiv");

        // serversDiv.innerHTML = ''; // Clear the div
        mapDiv.classList.add('grid-container');
        mapDiv.style.width = '80%';
        mapDiv.style.margin = 'auto';


        let serverInfo = getAllPCs(selectedRoom, data);

        for (let row of searchRoom.classRoomMatrix) {
            // console.log(row);
            for (let cell of row) {
                let newDivMain = document.createElement('div');
                newDivMain.classList.add('col');
                newDivMain.style.width = '16%';
                for (let pcLabel of serverInfo) {
                    if (cell === pcLabel.split('.')[0]) {
                        let serverDiv = smallDiv(pcLabel);
                        newDivMain.appendChild(serverDiv);
                    }
                    mapDiv.appendChild(newDivMain);
                }
            }
        }
    } catch (error) {
        console.error('Error fetching config data: ', error);
    }
}



function handleCheckboxInteraction(checkbox) {
    let cardID = 'Room_' + checkbox.id;
    let divs = document.getElementsByClassName("col " + cardID);

    let mapID = document.getElementById("Map");
    let mapdiv = document.getElementById("mapdiv");

    document.querySelector('footer').classList.add("position-static");

    if (mapID.checked === true && checkbox.checked === true) {
        for (let div of divs) {
            div.style.display = 'none';
        }
        // empty mapdiv if exists
        if (mapdiv) {mapdiv.innerHTML = '';}
        // create mapDiv object
        mapDiv();
        // create map child divs
        updateElement(checkbox.id);
        document.querySelector('footer').classList.remove("position-static");
        document.querySelector('footer').classList.add("fixed-bottom");
    }

    if (mapID.checked === false || checkbox.checked === false) {
        if (mapdiv) {mapdiv.innerHTML = '';}
        for (let div of divs) {
            if (checkbox.checked === true) {
                div.style.display = 'block';
            } else {
                div.style.display = 'none';
            }
        }
    }
}