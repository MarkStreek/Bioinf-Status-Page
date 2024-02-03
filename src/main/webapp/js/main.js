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
        innerdiv.style.width = "100%";

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
    divs.forEach(div => div.style.display = status);
}

//let checkboxes = document.querySelectorAll("input[type='checkbox']");
let checkboxes = document.getElementsByClassName("form-check-input form-check-input-lg mx-1");
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
        let status = [];
        Array.from(checkboxes).forEach(function (checkbox) {
            status.push(checkbox.checked);
        });
        if (!status.includes(true)) {
            showHideAllElements('block');
        }
    });
});


let statusSlider = document.getElementById("statusSlider");
statusSlider.addEventListener('change', function() {
    let divs = document.getElementsByClassName("col ");
    for (let i = 0; i < divs.length; i++) {
        if (divs[i].children[2].innerText === "Status: OFFLINE") {
            if (statusSlider.checked) {
                divs[i].style.display = 'none';
                //Array.from(checkboxes).forEach(checkbox => console.log("Checkbox : " + checkbox.id + checkbox.checked));
            } else {
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

setInterval(function () {
    void handlingUpdate();
}, 2000);

handling();
