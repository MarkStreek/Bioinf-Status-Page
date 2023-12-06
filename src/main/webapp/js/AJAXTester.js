async function updateElement() {
    let response = await fetch("data/config.json");
    let data = await response.json();

    let selectedRooms = getSelectedRooms() || Object.keys(data.data.room);
    let serversDiv = document.getElementById("innerDiv");
    serversDiv.innerHTML = ''; // Leeg de div

    for (let room of selectedRooms) {
        let servers = data.data.room[room];
        if (servers) {
            for (let pc of servers) {
                let newDivMain = createServerDiv(pc, room);
                serversDiv.appendChild(newDivMain);
            }
        }
    }
}

function createServerDiv(server, room) {
    let chooseRandomStatus = ['ONLINE', 'OFFLINE'][Math.floor(Math.random() * 2)];
    let customID = server

    // new main div
    let newDivMain = document.createElement('div');
    newDivMain.classList.add('col');
    newDivMain.setAttribute("id", server);

    // new subdiv
    let newDiv1 = document.createElement('div');
    newDiv1.classList.add('card', 'border-1');
    newDiv1.style.backgroundColor = `#4a5766`;
    newDiv1.style.height = `100px`;

    // new subdiv - card body
    let newDiv2 = document.createElement('div');
    newDiv2.classList.add('card-body');
    newDiv2.style.color = `#4a5766`;

    //Title for which pc
    let PCTitle = document.createElement('h4');
    PCTitle.textContent = `Server ${server.split('.')[0]}`;
    PCTitle.classList.add('card-title');
    PCTitle.style.color = `#f9f9f9`;

    // Title for the status
    let StatusTitle = document.createElement('p');
    StatusTitle.classList.add('card-text');
    StatusTitle.style.color = `#f9f9f9`;
    StatusTitle.textContent = `Room ${room}`;

    // status element red/green
    let statusTextObject = document.createElement('span');
    statusTextObject.textContent = `${chooseRandomStatus}`;
    statusTextObject.classList.add("status");

    // Logo element for aesthetics
    let logoImageObject = document.createElement("img");
    logoImageObject.classList.add("logo");
    logoImageObject.style.height = `40px`;
    logoImageObject.style.width = `40px`;
    logoImageObject.style.float = `right`;
    logoImageObject.style.position = `relative`;
    logoImageObject.style.bottom = `60px`;

    let buttonObject = document.createElement("button");
    buttonObject.classList.add("btn", "btn-primary");
    buttonObject.textContent = "More info";
    buttonObject.addEventListener('click', () => {
        let modalBodyText = `Server: ${server}, Room: ${room}, Status: ${chooseRandomStatus}`;
        openModal(modalBodyText);
    });



    // append all elements to the right parent elements
    newDivMain.appendChild(newDiv1);
    newDiv1.appendChild(newDiv2);
    newDiv2.appendChild(PCTitle);
    newDiv2.appendChild(StatusTitle);
    newDiv2.appendChild(logoImageObject);
    newDiv2.appendChild(buttonObject);
    StatusTitle.appendChild(statusTextObject);


    // Changing the color
    if (chooseRandomStatus === "ONLINE") {
        statusTextObject.style.color = `#3cb371`;
        newDiv1.style.borderColor = `#3cb371`;
        logoImageObject.setAttribute("src", "../../images/logo_ONLINE.png");
    } else {
        statusTextObject.style.color = `#ff0000`;
        newDiv1.style.borderColor = `#ff0000`;
        logoImageObject.setAttribute("src", "../../images/logo_OFFLINE.png");
    }

    // newDivMain.addEventListener('click', () => {
    //     let modalBodyText = `Server: ${server}, Room: ${room}, Status: ${chooseRandomStatus}`;
    //     openModal(modalBodyText);
    // });

    return newDivMain;
}

function getSelectedRooms() {
    let checkboxes = document.querySelectorAll('input[name="room"]:checked');
    let rooms = Array.from(checkboxes).map(cb => cb.value);
    return rooms.length > 0 ? rooms : null;
}

// Event listeners
document.addEventListener('DOMContentLoaded', updateElement);
document.querySelectorAll('input[name="room"]').forEach(cb => {
    cb.addEventListener('change', updateElement);
});
