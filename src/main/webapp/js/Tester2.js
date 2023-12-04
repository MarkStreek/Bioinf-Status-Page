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
                let roomDiv = document.createElement("div");
                roomDiv.textContent = "Room " + room + ": " + pc;
                roomDiv.classList.add('col', 'border-1');
                roomDiv.style.border = '1px solid black';
                roomDiv.style.backgroundColor = `#4a5766`;
                serversDiv.appendChild(roomDiv);
            }
        }
    }
}

function getSelectedRooms() {
    let checkboxes = document.querySelectorAll('input[name="room"]:checked');
    let rooms = Array.from(checkboxes).map(cb => cb.value);

    return rooms.length > 0 ? rooms : null;
}

// Aanroepen bij laden pagina en bij wijziging van checkboxes
document.addEventListener('DOMContentLoaded', updateElement);
document.querySelectorAll('input[name="room"]').forEach(cb => {
    cb.addEventListener('change', updateElement);
});
