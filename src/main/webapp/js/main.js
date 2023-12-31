document.addEventListener('DOMContentLoaded', function () {
    const mapCheckbox = document.getElementById("Map");
    const roomCheckboxes = document.querySelectorAll("input[type='checkbox'][name='room']");
    const mapDiv = document.getElementById("mapdiv");

    function updateCheckboxStates() {
        const checkedRoomCount = Array.from(roomCheckboxes).filter(cb => cb.checked).length;
        const isMapChecked = mapCheckbox.checked;

        // Disable map checkbox if two or more rooms are selected
        mapCheckbox.disabled = checkedRoomCount >= 2;

        // Enable or disable room checkboxes based on the map checkbox and the number of checked rooms
        roomCheckboxes.forEach(cb => {
            if (isMapChecked && checkedRoomCount === 1) {
                cb.disabled = !cb.checked;
            } else {
                cb.disabled = false;
            }
        });

        // Show or hide map based on the map checkbox and the number of checked rooms
        mapDiv.style.display = (isMapChecked && checkedRoomCount === 1) ? 'block' : 'none';
    }

    // Add event listeners to checkboxes
    mapCheckbox.addEventListener('change', updateCheckboxStates);
    roomCheckboxes.forEach(cb => {
        cb.addEventListener('change', updateCheckboxStates);
    });

    // Initial state update
    updateCheckboxStates();
});



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
        let innerdiv = document.getElementById("innerdiv");

        for (let i = 0; i < AllPCS.length; i++) {
            let workstation = AllPCS[i].workstation;
            let room = AllPCS[i].room;
            let newDivMain = createWorkStationDiv(workstation, room);
            innerdiv.appendChild(newDivMain);
        }
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
            // function that handles visibility of cards or map div objects
            handleCheckboxInteraction(checkbox);
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


setInterval(function () {
    void handlingUpdate();
}, 2500);

// Calling the handling function, that starts the whole process
handling();
