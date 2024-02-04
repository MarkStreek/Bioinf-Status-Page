/**
 * Title: main.js
 * Authors: Sibren, Luka and Mark
 * Copyright: Bioinf-Status-Page, 2023-2024
 *
 * Main Javascript file that handles the event listeners and
 * the main functionality of the home page.
 */

/*
Retrieve data from config.json file
@return AllPCS: list with all pc objects; each object holds a room name value and a workstation name value
*/
async function retrieveData() {
    let response = await fetch("data/config.json");
    let data = await response.json();
    // Get rooms and their contents from 'data' object
    let rooms = Object.entries(data.data.room);
    // Reduce rooms and their contents to a list with all pcs that hold their room name and own name.
    return rooms.reduce((AllPCS, [room, roomData]) => {
        let pcs = roomData.pc;
        pcs.forEach(pc => AllPCS.push({workstation: pc, room: room}));
        return AllPCS;
    }, []);
}

/*
Fill 'innerdiv' with all workstation div cards.
@param AllPCS: a list of all pcs retrieved by invoking the 'retrieveData()' function
*/
function handling() {
    // Retrieve the all pc list
    retrieveData().then(AllPCS => {
        let innerdiv = document.getElementById("innerdiv");
        innerdiv.style.width = "100%"; // Ensure full width for flexibility with contents
        // Iterate over all pcs and pass their room name and own name to the create workstation card function.
        // Function to create a div of a pc is invoked and each workstation object (newDivMain) is added to 'innerdiv'
        for (let i = 0; i < AllPCS.length; i++) {
            let workstation = AllPCS[i].workstation;
            let room = AllPCS[i].room;
            let newDivMain = createWorkStationDiv(workstation, room);
            innerdiv.appendChild(newDivMain);
        }
    });
}

/*
Sets all div elements display according to what the status value contains
@param status: true if a checkbox is checked and false if no checkboxes are checked
*/
function showHideAllElements(status) {
    // Retrieve all workstation cards by classname
    let divs = document.querySelectorAll("[class^='col Room_']");
    // Set display for each div
    divs.forEach(div => div.style.display = status);
}

// Get all checkboxes by classname (from index.html)
let checkboxes = document.getElementsByClassName("form-check-input form-check-input-lg mx-1");
// For each checkbox (filter with a room name value), evaluate if it's checked. If so the divs corresponding to that
// room will be displayed as block (viewable). Otherwise, set display to none (not viewable)
Array.from(checkboxes).forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        Array.from(checkboxes).forEach(function (checkbox) {
            let cardID = 'Room_' + checkbox.id;
            let divs = document.getElementsByClassName("col " + cardID);
            for (let div of divs) {
                if (checkbox.checked === true) {
                    div.style.display = 'block';
                } else {
                    div.style.display = 'none';
                }
            }
        });
        // Create list of checkboxes checked statuses
        let checkedStatus = [];
        Array.from(checkboxes).forEach(function (checkbox) {
            checkedStatus.push(checkbox.checked);
        });
        // If no checkbox in the checkedStatus list is checked (checked i.e. true), then display all divs
        if (!checkedStatus.includes(true)) {
            showHideAllElements('block');
        }
    });
});

// Get statusSlider object (a clickable slider to filter workstation cards by their online status value)
let statusSlider = document.getElementById("statusSlider");
// Event that if the slider is checked (i.e. true to filter all offline pcs), then searches the statuses of all divs
// and if 'OFFLINE' then set their display to none (not viewable)
statusSlider.addEventListener('change', function() {
    let divs = document.getElementsByClassName("col ");
    // Get roomCheckbox objects
    const roomCheckboxes = document.querySelectorAll("input[type='checkbox'][name='room']");

    /*
    Count roomCheckboxes that are checked. The statusSlider is per default disabled. But if a roomCheckbox
    is checked the statusSlider becomes enabled.
    */
    function updateSliderAccessibility() {
        const checkedRoomCount = Array.from(roomCheckboxes).filter(cb => cb.checked).length;
        // Disable map checkbox by default
        statusSlider.disabled = true;

        // Enable map checkbox if at least one room is selected
        if (checkedRoomCount > 0) {
            statusSlider.disabled = false;
        } // If all checkboxes are unchecked then uncheck the statusSlider
        else {
            statusSlider.checked = false;
        }
    }

    // Attach event listeners to room checkboxes
    roomCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateSliderAccessibility);
    });

    // Initial check to set the slider status
    updateSliderAccessibility();

    for (let i = 0; i < divs.length; i++) {
        // Check if offline and statusSlider is checked i.e. true
        if (divs[i].children[2].innerText === "Status: OFFLINE") {
            if (statusSlider.checked) {
                divs[i].style.display = 'none';
            } else {
                // Checked status false? Then redeploy the normal checkbox (filter by room) logic
                Array.from(checkboxes).forEach(checkbox => {
                    let cardID = 'Room_' + checkbox.id;
                    let divs = document.getElementsByClassName("col " + cardID);
                    for (let div of divs) {
                        if (checkbox.checked === true) {
                            div.style.display = 'block';
                        } else {
                            div.style.display = 'none';
                        }
                    }
                });
            }
        }
    }

});

// Interval of 2000ms for fetching and updating the div card contents
setInterval(function () {
    void handlingUpdate();
}, 2000);
// Invoke the action to fill 'innerdiv'
handling();
