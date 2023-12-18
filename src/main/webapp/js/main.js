
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
            let cardID = 'Room_' + checkbox.id;
            let divs = document.getElementsByClassName("col " + cardID);
            let mapID = document.getElementById("Map");
            let serversDiv = document.getElementById("innerdiv");
            if (mapID.checked === true && checkbox.checked === true) {
                updateElement(checkbox.id);
                divs.style.display = 'none';
            }
            for (let div of divs) {
                if (checkbox.checked === true) {
                    div.style.display = 'block';
                } else {
                    div.style.display = 'none';
                }
            }

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
