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



async function handling() {
    let responseRequest = await fetch("/requestListener");
    let data = await responseRequest.json();

    let responseConfigData = await fetch("data/config.json");
    let configData = await responseConfigData.json();

    const rooms = Object.values(configData.data.room);
    const allPcs = rooms.reduce((acc, pcs) => acc.concat(pcs), []);

    for (let i = 0; i < data.length; i++) {
        updateContent(data[i], allPcs);
    }

    let selectedRooms = getSelectedRooms() || Object.keys(configData.data.room);
    let serversDiv = document.getElementById("innerDiv");

    serversDiv.innerHTML = ''; // Leeg de div
    for (let room of selectedRooms) {
        console.log(room);
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
    let chooseRandomStatus = "OFFLINE"; // ['ONLINE', 'OFFLINE'][Math.floor(Math.random() * 2)];


    // TODO: does the newDivMain needs an ID?
    // new main div
    let newDivMain = document.createElement('div');
    newDivMain.classList.add('col');
    newDivMain.setAttribute("id", server);
    newDivMain.style.width = '25%';


    // new subdiv
    let newDiv1 = document.createElement('div');
    newDiv1.classList.add('card', 'border-1');
    newDiv1.style.backgroundColor = `#4a5766`;
    newDiv1.id = server + "_card";

    // new subdiv - card body
    let newDiv2 = document.createElement('div');
    newDiv2.classList.add('card-body');
    newDiv2.style.color = `#4a5766`;

    //Title for which pc
    let PCTitle = document.createElement('h4');
    PCTitle.textContent = `Server ${server.split('.')[0]}`;
    PCTitle.classList.add('card-title');
    PCTitle.style.color = `#f9f9f9`;
    PCTitle.style.width = '70%';

    // Title for the status
    let StatusTitle = document.createElement('p');
    StatusTitle.classList.add('card-text');
    StatusTitle.style.color = `#f9f9f9`;
    StatusTitle.textContent = `Room ${room}`;
    StatusTitle.style.width = '70%';

    // status element red/green
    let statusTextObject = document.createElement('span');
    statusTextObject.textContent = `${chooseRandomStatus}`;
    statusTextObject.classList.add("status");
    statusTextObject.id = server + "_status";

    // Logo element for aesthetics
    let logoImageObject = document.createElement("img");
    logoImageObject.id = server + "_img";
    logoImageObject.classList.add("logo") ;logoImageObject.style.height = `40px`;
    logoImageObject.style.width = `40px`; logoImageObject.style.float = `right`;
    logoImageObject.style.position = `relative`; logoImageObject.style.bottom = `60px`;

    statusTextObject.style.color = `#ff0000`;
    newDiv1.style.borderColor = `#ff0000`;
    logoImageObject.setAttribute("src", "../../images/logo_OFFLINE.png");

    ////////////////////////////////////

    // MODAL STUFF

    const button = document.createElement('button');
    button.className = 'btn btn-primary';
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#reg-modal_' + server.split('.')[0]);
    button.textContent = 'Show Status';

    // Create modal element
    const modal = document.createElement('div');
    // it is possible to add a fade in here
    modal.className = 'modal';
    modal.id = 'reg-modal_' + server.split('.')[0];
    modal.tabIndex = '-1';

    // Create modal dialog
    const modalDialog = document.createElement('div');
    modalDialog.className = 'modal-dialog';

    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    // Create modal header
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';

    const title = document.createElement('h1');
    title.className = 'modal-title';
    title.textContent = 'Status of ' + server.split('.')[0];

    const closeButton = document.createElement('button');
    closeButton.className = 'btn-close';
    closeButton.type = 'button';
    closeButton.setAttribute('data-bs-dismiss', 'modal');

    modalHeader.appendChild(title);
    modalHeader.appendChild(closeButton);

    // Create modal body
    const modalBody = document.createElement('div');
    modalBody.className = 'modal-body';

    const currentLoad = document.createElement('p');
    currentLoad.textContent = 'Updating...';
    currentLoad.id = server + "_load";

    const currentFreeMemory = document.createElement('p');
    currentFreeMemory.textContent = 'Updating...';
    currentFreeMemory.id = server + "_currentFreeMemory";

    const loadLast5 = document.createElement('p');
    loadLast5.textContent = 'Updating..';
    loadLast5.id = server + "_loadlast5";

    const availableMemory = document.createElement('p');
    availableMemory.textContent = 'Updating..';
    availableMemory.id = server + "_availableMemory";

    const temperature = document.createElement('p');
    temperature.textContent = 'Updating...';
    temperature.id = server + "_temperature";

    modalBody.appendChild(currentLoad);
    modalBody.appendChild(currentFreeMemory);
    modalBody.appendChild(loadLast5);
    modalBody.appendChild(temperature);
    modalBody.appendChild(availableMemory);

    // Create modal footer
    const modalFooter = document.createElement('div');
    modalFooter.className = 'modal-footer';

    const closeButtonModal = document.createElement('button');
    closeButtonModal.className = 'btn btn-primary';
    closeButtonModal.type = 'button';
    closeButtonModal.setAttribute('data-bs-dismiss', 'modal');
    closeButtonModal.textContent = 'Close';

    modalFooter.appendChild(closeButtonModal);

    // Assemble modal components
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);

    modalDialog.appendChild(modalContent);
    modal.appendChild(modalDialog);

    ////////////////////////////////////

    // append all elements to the right parent elements
    newDivMain.appendChild(newDiv1);
    newDiv1.appendChild(newDiv2);
    newDiv2.appendChild(PCTitle);
    newDiv2.appendChild(StatusTitle);
    newDiv2.appendChild(logoImageObject);
    // button from modal
    newDiv2.appendChild(button);
    StatusTitle.appendChild(statusTextObject);

    //newDivMain.appendChild(button);
    newDiv1.appendChild(modal);

    // Changing the color
    // if (chooseRandomStatus === "ONLINE") {
    //     statusTextObject.style.color = `#3cb371`;
    //     newDiv1.style.borderColor = `#3cb371`;
    //     logoImageObject.setAttribute("src", "../../images/logo_ONLINE.png");
    // } else {
    //     statusTextObject.style.color = `#ff0000`;
    //     newDiv1.style.borderColor = `#ff0000`;
    //     logoImageObject.setAttribute("src", "../../images/logo_OFFLINE.png");
    // }
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


// setTimeout(function (){
//
//     document.getElementById("nuc001.bin.bioinf.nl_load").innerText = "DEZE TEKTS IS VERANDERD";
// }, 500);


