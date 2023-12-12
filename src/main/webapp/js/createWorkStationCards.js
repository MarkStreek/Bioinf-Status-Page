/*
Function to create a new div for each workstation
 */
function createWorkStationDiv(instance) {
    // New Main div
    let newDivMain = document.createElement('div');
    newDivMain.classList.add('col'); newDivMain.style.width = '25%';
    newDivMain.id = instance.workstation;
    // New Card for the workstation
    let DivCard = document.createElement('div');
    DivCard.classList.add('card', 'border-1'); DivCard.style.backgroundColor = `#4a5766`;
    DivCard.id = instance.workstation + "_card"; DivCard.style.borderColor = `#ff0000`;
    // New div for the card body
    let CardBody = document.createElement('div');
    CardBody.classList.add('card-body'); CardBody.style.color = `#4a5766`;
    //Title for which workstation
    let PCTitle = document.createElement('h4');
    PCTitle.textContent = `Workstation: ${instance.workstation.split('.')[0]}`;
    PCTitle.classList.add('card-title'); PCTitle.style.color = `#f9f9f9`; PCTitle.style.width = '70%';
    // Element for the current load on card (without opening the modal)
    let currentLoadDirect = document.createElement('p');
    currentLoadDirect.classList.add('card-text'); currentLoadDirect.textContent = 'Updating...';
    currentLoadDirect.id = instance.workstation + "_loadDirect"; currentLoadDirect.style.position = `absolute`;
    currentLoadDirect.style.left = '5%';currentLoadDirect.style.top = '58%';

    // COLOR STUFF - DEFAULT: EVERYTHING IS OFFLINE / RED
    // Element for the status title
    let StatusTitle = document.createElement('p');
    StatusTitle.classList.add('card-text');StatusTitle.style.color = `#f9f9f9`;
    StatusTitle.textContent = `Room ${instance.room}`; StatusTitle.style.width = '70%';
    // status element offline/online -> red/green
    let statusTextObject = document.createElement('span');
    statusTextObject.textContent = "OFFLINE"; statusTextObject.classList.add("status");
    statusTextObject.id = instance.workstation + "_status"; statusTextObject.style.color = `#ff0000`;
    // Logo element for aesthetics
    let logoImageObject = document.createElement("img");
    logoImageObject.id = instance.workstation + "_img";
    logoImageObject.classList.add("logo"); logoImageObject.style.height = `40px`;
    logoImageObject.style.width = `40px`; logoImageObject.style.float = `right`;
    logoImageObject.style.position = `relative`; logoImageObject.style.bottom = `60px`;
    logoImageObject.setAttribute("src", "../../images/logo_OFFLINE.png");

    // Create the modal for the workstation
    let values = createModal(instance.workstation, instance.room);
    let button = values[0];
    let modal = values[1];

    // Append everything together
    newDivMain.appendChild(DivCard);
    DivCard.appendChild(CardBody);
    CardBody.appendChild(PCTitle);
    CardBody.appendChild(StatusTitle);
    CardBody.appendChild(logoImageObject);
    // button from modal
    CardBody.appendChild(button);
    StatusTitle.appendChild(statusTextObject);
    StatusTitle.appendChild(currentLoadDirect);
    //newDivMain.appendChild(button);
    DivCard.appendChild(modal);

    let serversDiv = document.getElementById("innerdiv");
    serversDiv.appendChild(newDivMain);
}

function createModal(workstation, room) {
    // Show Status Button for the card
    let button = document.createElement('button');
    button.className = 'btn btn-primary';
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#reg-modal_' + workstation.split('.')[0]);
    button.textContent = 'Show Status'; button.style.position = `absolute`; button.style.left = '5%'; button.style.bottom = '5%';
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

    // Append all elements to modal body
    modalBody.appendChild(currentLoad);
    modalBody.appendChild(currentFreeMemory);
    modalBody.appendChild(loadLast5);
    modalBody.appendChild(temperature);
    modalBody.appendChild(availableMemory);

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