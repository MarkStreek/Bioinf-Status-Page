function updateCheckBox() {

    ////////
    /////// UPDATE THIS FUNCTION!
    ////////

    let checkboxes = document.getElementById('myCheck');
    let card = document.getElementById('nuc102.bin.bioinf.nl');

    if (checkboxes.checked === true){
        card.style.display = "none";
    } else {
        card.style.display = "block";
    }
}

async function retrieveData() {
    let response = await fetch("data/config.json");
    let data = await response.json();

    let rooms = Object.entries(data.data.room);
    return rooms.reduce((acc, [room, pcs]) => {
        pcs.forEach(pc => acc.push({workstation: pc, room: room}));
        return acc;
    }, []);
}

function handling() {
    retrieveData().then(AllPCS => {
        AllPCS.forEach(createWorkStationDiv)

    });
}

// Calling the handling function, that starts the whole process
handling();

// Add event listener for checkbox
document.getElementById("myCheck").addEventListener("click", updateCheckBox);
