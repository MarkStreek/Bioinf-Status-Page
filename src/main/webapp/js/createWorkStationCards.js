/**
 * Title: createWorkStationCards.js
 * Authors: Sibren, Luka and Mark
 * Copyright: Bioinf-Status-Page, 2023-2024
 *
 * This file is responsible for creating a workstation card
 * for every workstation on the home page
 */

/*
Creates a workstation div object. This includes a card, title, front information, a button that opens a modal,
a modal with more information + a canvasChart displaying a load history.
@param workstation, room: workstation name, corresponding room name
@return card: a final div object (workstation card) containing all data and styling
*/
function createWorkStationDiv(workstation, room) {
    let card = document.createElement('div');
    // Styling custom shape of div card
    card.style.flexDirection = "column";
    card.style.justifyContent = "center";
    card.style.position = "relative";
    card.style.fontWeight = "600";
    card.style.width = "250px"; // Verhoogd naar 250px
    card.style.height = "225px"; // Verhoogd naar 250px
    card.style.borderRadius = "5px";
    card.style.margin = "12px"; // Verhoogd naar 12px
    card.style.border = "2px solid grey";
    card.style.backgroundColor = "#CC6482";
    card.style.boxShadow = "4px 4px 15px grey";
    card.classList.add("col", "Room_" + room);
    card.style.display = 'block';
    card.id = workstation + "_card";

    // Add title and custom font appearance
    let title = document.createElement("h5");
    title.innerText = workstation.split('.')[0].toUpperCase();
    title.style.fontFamily = "Cambria, sans-serif";
    title.style.marginTop = "35px";
    title.style.fontSize = "25px";
    card.appendChild(title);

    // Add load value and manage positioning inside the card
    let load = document.createElement("div");
    load.id = workstation + "_loadDirect";
    load.style.display = "inline-block";
    load.style.width = "20px";
    load.style.height = "20px";
    load.style.border = "2px solid #f3f3f3";
    load.style.borderRadius = "50%";
    load.style.borderTop = "2px solid #3498db";
    // Make the styles of 'style' change (animate the loading circle)
    load.style.animation = "spin 2s linear infinite";
    card.appendChild(load);

    // A spinning wheel element when no data of load are present
    let style = document.createElement('style');
    style.innerHTML = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }`;
    document.head.appendChild(style);

    // Default status style when a workstation is offline
    let status = document.createElement("p");
    status.innerText = "Status: ";
    let statusText = document.createElement("span");
    statusText.innerText = "OFFLINE";
    statusText.style.color = "#D9D9D9";
    statusText.id = workstation + "_status";
    statusText.classList.add("status");
    status.appendChild(statusText);
    status.id = "status";
    status.style.fontSize = "20px";
    card.appendChild(status);

    // Create the modal for the workstation and add clickable button
    let values = createModal(workstation);
    let button = values[0];
    let modal = values[1];

    card.appendChild(button);
    // Append finalized modal to card
    card.appendChild(modal);

    return card;
}

/*
Creates a modal (pop-up window) with extra info about a workstation
@param workstation: workstation name
@return [button, modal]: a list with the button and the modal for the workstation card
*/
function createModal(workstation) {
    // Show Status Button for the card (shaping)
    let button = document.createElement('button');
    button.classList = "btn btn-secondary";
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#reg-modal_' + workstation.split('.')[0]);
    button.textContent = 'Show Status';
    button.style.width = "90%";
    button.style.position = "absolute";
    button.style.bottom = "30px";

    // Main Model DIV (shaping)
    let modal = document.createElement('div');
    modal.className = 'modal'; modal.id = 'reg-modal_' + workstation.split('.')[0];
    modal.tabIndex = '-1';

    modal.style.position = "fixed";
    modal.style.top = "50%";
    modal.style.left = "50%";
    modal.style.transform = "translate(-50%, -50%)";

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

    return [button, modal]
}

/*
Creates a modal header
@param workstation: workstation name
@return modalHeader: final header object
*/
function createModalHeader(workstation) {
    // Create modal header
    let modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    // Header Title
    let title = document.createElement('h1');
    title.className = 'modal-title';
    title.textContent = 'Status of ' + workstation.split('.')[0].toUpperCase();
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

/*
Creates a modal body
@param workstation: workstation name
@return modalBody: final body object
*/
function createModalBody(workstation) {
    // Create modal body div
    let modalBody = document.createElement('div');
    modalBody.className = 'modal-body';
    // Element for the current load
    let currentLoad = document.createElement('p');
    currentLoad.textContent = 'Not available'; currentLoad.id = workstation + "_load";
    // Element for the current free memory
    let currentFreeMemory = document.createElement('p');
    currentFreeMemory.textContent = 'Not available'; currentFreeMemory.id = workstation + "_currentFreeMemory";
    // Element for the load of the last 5 minutes
    let loadLast5 = document.createElement('p');
    loadLast5.textContent = 'Not available'; loadLast5.id = workstation + "_loadlast5";
    // Element for the available memory
    let availableMemory = document.createElement('p');
    availableMemory.textContent = 'Not available'; availableMemory.id = workstation + "_availableMemory";
    // Element for the temperature
    let temperature = document.createElement('p');
    temperature.textContent = 'Not available'; temperature.id = workstation + "_temperature";


    // Element for the chart
    let canvasChart = document.createElement('canvas');
    canvasChart.id = workstation + '_myChart';

    // Append all elements to modal body
    modalBody.appendChild(currentLoad);
    modalBody.appendChild(currentFreeMemory);
    modalBody.appendChild(loadLast5);
    modalBody.appendChild(temperature);
    modalBody.appendChild(availableMemory);
    modalBody.appendChild(canvasChart)

    return modalBody;
}

/*
Creates a modal footer
@return modalFooter: final footer object
*/
function createModalFooter() {
    // Create a close button in the footer
    let closeButtonModal = document.createElement('button');
    closeButtonModal.className = 'btn btn-secondary'; closeButtonModal.type = 'button';
    closeButtonModal.setAttribute('data-bs-dismiss', 'modal');
    closeButtonModal.textContent = 'Close';
    // Main div for the footer
    let modalFooter = document.createElement('div');
    modalFooter.className = 'modal-footer';
    // Append close button to footer
    modalFooter.appendChild(closeButtonModal);

    return modalFooter;
}
