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
        document.body.style.backgroundColor = "lightgrey";

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

let scrollButton = document.getElementById("btn-page-up");

// Start show button event after scroll
window.onscroll = function () {
    showScrollButton();
};

function showScrollButton() {
    if (
        document.body.scrollTop > 10 ||
        document.documentElement.scrollTop > 10
    ) { // causes the button to show after performing 1 scroll
        scrollButton.style.display = "block";
    } else {
        // causes the button to disappear when at top of page
        scrollButton.style.display = "none"
    }
}

// Start scroll up when on-click event is activated
scrollButton.addEventListener("click", scrollPageUp);

function scrollPageUp() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

let checkboxes = document.querySelectorAll("input[type='checkbox']");
checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        checkboxes.forEach(function(checkbox) {
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

handling();
