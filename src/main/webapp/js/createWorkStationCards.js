function createWorkStationDiv(workstation, room) {

    //
    // For bootstrap grid system with breakpoints:
    // 'col-xxl-2', 'col-xl-2', 'col-lg-2', 'col-md-3', 'col-sm-4', 'col-6', 'g-2'
    // Add the above line to the classList below
    //
    // New Main div
    let newDivMain = document.createElement('div');
    newDivMain.classList.add('col', 'Room_' + room, 'example'); newDivMain.style.width = '300px';
    newDivMain.id = workstation;
    newDivMain.style.display = 'block'; // style block for hiding by default!

    // if (window.matchMedia("(min-width: 20%)").matches) {
    //     /* the viewport is at least 300 pixels wide */
    //     let newDivMain = document.createElement('div');
    //     newDivMain.style.width = '50%';
    // }
    // New Card for the workstation
    let DivCard = document.createElement('div');
    DivCard.classList.add('card'); DivCard.style.backgroundColor = `#4a5766`;
    DivCard.id = workstation + "_card"; DivCard.style.borderColor = `#ff0000`;

    // New div for the card body
    let CardBody = document.createElement('div');
    CardBody.classList.add('card-body'); CardBody.style.color = `#4a5766`;
    // CardBody.style.maxWidth = 'fit-content';
    //Title for which workstation
    let PCTitle = document.createElement('h4');
    PCTitle.textContent = `Workstation: ${workstation.split('.')[0]}`;
    PCTitle.classList.add('card-title'); PCTitle.style.color = `#f9f9f9`; //PCTitle.style.width = '70%';
    // Element for the current load on card (without opening the modal)
    let currentLoadDirect = document.createElement('p');
    currentLoadDirect.classList.add('card-text'); currentLoadDirect.textContent = 'Updating...';
    currentLoadDirect.id = workstation + "_loadDirect";

    // COLOR STUFF - DEFAULT: EVERYTHING IS OFFLINE / RED
    // Element for the status title
    let StatusTitle = document.createElement('p');
    StatusTitle.classList.add('card-text');StatusTitle.style.color = `#f9f9f9`;
    StatusTitle.textContent = "Room " +  room;
    // status element offline/online -> red/green
    let statusTextObject = document.createElement('span');
    statusTextObject.textContent = " OFFLINE"; statusTextObject.classList.add("status");
    statusTextObject.id = workstation + "_status"; statusTextObject.style.color = `#ff0000`;
    // Logo element for aesthetics
    let logoImageObject = document.createElement("img");
    logoImageObject.id = workstation + "_img";
    logoImageObject.classList.add("logo"); logoImageObject.style.height = `40px`;
    logoImageObject.style.width = `50px`; logoImageObject.style.float = `right`;
    logoImageObject.style.position = `relative`; logoImageObject.style.bottom = `60px`;
    logoImageObject.setAttribute("src", "../../images/logo_OFFLINE.png");

    // Create the modal for the workstation
    let values = createModal(workstation, room);
    let button = values[0];
    let modal = values[1];

    // Append everything together
    newDivMain.appendChild(DivCard);
    DivCard.appendChild(CardBody);
    CardBody.appendChild(PCTitle);
    // CardBody.appendChild(StatusTitle);
    // CardBody.appendChild(logoImageObject);
    // // button from modal
    // CardBody.appendChild(button);
    // StatusTitle.appendChild(statusTextObject);
    // StatusTitle.appendChild(currentLoadDirect);
    DivCard.appendChild(modal);

    return newDivMain;
}


function createModal(workstation, room) {
    // Show Status Button for the card
    let button = document.createElement('button');
    button.className = 'btn btn-primary';
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#reg-modal_' + workstation.split('.')[0]);
    button.textContent = 'Show Status';

    // Main Model DIV
    let modal = document.createElement('div');
    modal.className = 'modal'; modal.id = 'reg-modal_' + workstation.split('.')[0];
    modal.tabIndex = '-1';
    // Create modal dialog
    let modalDialog = document.createElement('div');
    modalDialog.className = 'modal-dialog';
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    // Create the modal header, body and footer
    let modalHeader = createModalHeader(workstation);
    let modalBody = createModalBody(workstation);
    let modalFooter = createModalFooter(workstation);

    // Append everything together
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);
    modalDialog.appendChild(modalContent);
    modal.appendChild(modalDialog);

    // Return the button and the modal for the cards
    return [button, modal]
}

function createModalHeader(workstation) {
    // Create modal header
    let modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    // Header Title
    let title = document.createElement('h1');
    title.className = 'modal-title';
    title.textContent = 'Status of ' + workstation.split('.')[0];
    // Header Close Button
    let closeButton = document.createElement('button');
    closeButton.className = 'btn-close';
    closeButton.type = 'button';
    closeButton.setAttribute('data-bs-dismiss', 'modal');

    // Append title and close button to header
    modalHeader.appendChild(title);
    modalHeader.appendChild(closeButton);

    return modalHeader;
}

function createModalBody(workstation) {
    // Create modal body div
    let modalBody = document.createElement('div');
    modalBody.className = 'modal-body';
    // Element for the current load
    let currentLoad = document.createElement('p');
    currentLoad.textContent = 'Updating...'; currentLoad.id = workstation + "_load";
    // Element for the current free memory
    let currentFreeMemory = document.createElement('p');
    currentFreeMemory.textContent = 'Updating...'; currentFreeMemory.id = workstation + "_currentFreeMemory";
    // Element for the load of the last 5 minutes
    let loadLast5 = document.createElement('p');
    loadLast5.textContent = 'Updating..'; loadLast5.id = workstation + "_loadlast5";
    // Element for the available memory
    let availableMemory = document.createElement('p');
    availableMemory.textContent = 'Updating..'; availableMemory.id = workstation + "_availableMemory";
    // Element for the temperature
    let temperature = document.createElement('p');
    temperature.textContent = 'Updating...'; temperature.id = workstation + "_temperature";


    // Element for the chart
    let canvasChart = document.createElement('canvas');
    canvasChart.id = workstation + '_myChart';
    //<canvas id="myChart"></canvas>

    // Append all elements to modal body
    modalBody.appendChild(currentLoad);
    modalBody.appendChild(currentFreeMemory);
    modalBody.appendChild(loadLast5);
    modalBody.appendChild(temperature);
    modalBody.appendChild(availableMemory);
    modalBody.appendChild(canvasChart)
    // Chart element

    return modalBody;
}

function createModalFooter() {
    // Create a close button for the footer
    let closeButtonModal = document.createElement('button');
    closeButtonModal.className = 'btn btn-primary'; closeButtonModal.type = 'button';
    closeButtonModal.setAttribute('data-bs-dismiss', 'modal');
    closeButtonModal.textContent = 'Close';
    // Main div for the footer
    let modalFooter = document.createElement('div');
    modalFooter.className = 'modal-footer';

    // Append close button to footer
    modalFooter.appendChild(closeButtonModal);

    return modalFooter;
}

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


// function getAllPCs(selectedRoom, data) {
//     let servers = data.data.room[selectedRoom]
//     if (serverState.currentServerIndex < servers.pc.length) {
//         let server = servers.pc[serverState.currentServerIndex];
//         serverState.currentServerIndex++;
//
//         return server;
//     } else {
//         // Move to the next room and reset the server index
//         serverState.currentServerIndex = 0;
//     }
//
//     // No more servers left
//     return null;
// }

