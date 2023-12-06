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
    document.body.appendChild(serversDiv);
}

function createServerDiv(server, room) {
    let chooseRandomStatus = ['ONLINE', 'OFFLINE'][Math.floor(Math.random() * 2)];


    // new main div
    let newDivMain = document.createElement('div');
    newDivMain.classList.add('col');
    newDivMain.setAttribute("id", server);
    newDivMain.style.width = '25%';

    // new subdiv
    let newDiv1 = document.createElement('div');
    newDiv1.classList.add('card', 'border-1');
    newDiv1.style.backgroundColor = `#4a5766`;
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
    buttonObject.style.position = 'relative';
    buttonObject.style.right = '20%';
    buttonObject.addEventListener('click', () => {
        let modalBodyText = `Server: ${server}, Room: ${room}, Status: ${chooseRandomStatus}`;
        openModal(modalBodyText);
    });

    ////////////////////////////////////

    // MODAL STUFF

    const button = document.createElement('button');
    button.className = 'btn btn-primary';
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#reg-modal');
    button.textContent = 'Show Status';

    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'reg-modal';
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
    title.textContent = 'Status of NUC 107';

    const closeButton = document.createElement('button');
    closeButton.className = 'btn-close';
    closeButton.type = 'button';
    closeButton.setAttribute('data-bs-dismiss', 'modal');

    modalHeader.appendChild(title);
    modalHeader.appendChild(closeButton);

    // Create modal body
    const modalBody = document.createElement('div');
    modalBody.className = 'modal-body';

    const instanceName = document.createElement('p');
    instanceName.textContent = 'Instance name: ';

    const currentLoad = document.createElement('p');
    currentLoad.textContent = 'Current load: ';
    currentLoad.id = server + "_load";

    const currentFreeMemory = document.createElement('p');
    currentFreeMemory.textContent = 'Current free memory: ';
    currentFreeMemory.setAttribute("id", "currentFreeMemory");

    const freeMemoryLast5Minutes = document.createElement('p');
    freeMemoryLast5Minutes.textContent = 'Free memory last 5 minutes: ';

    modalBody.appendChild(instanceName);
    modalBody.appendChild(currentLoad);
    modalBody.appendChild(currentFreeMemory);
    modalBody.appendChild(freeMemoryLast5Minutes);

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
    newDiv2.appendChild(buttonObject);
    StatusTitle.appendChild(statusTextObject);

    newDivMain.appendChild(button);
    newDivMain.appendChild(modal);

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


setTimeout(function (){

    document.getElementById("nuc001.bin.bioinf.nl_load").innerText = "DEZE TEKTS IS VERANDERD";
}, 5000);


