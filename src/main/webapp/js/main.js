// get all the buttons with a querySelectorAll on type = button
let buttons = document.querySelectorAll("button[type=button]");
buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        let buttonID = button.id;
        console.log("BUTTON CLICKED: " + buttonID);
        void handleMap(buttonID);
    });
});

async function handleMap(room) {
    let configFile = await fetch("data/config.json");
    let configData = await configFile.json();

    let workstations = getAllWorkstations(configData, room);

    let maxLength = (configData.data.room[room].classRoomMatrix[0].length) * 120;
    document.getElementById("mapdiv").style.width = `${maxLength}px`;

    console.log(JSON.stringify(configData.data.room[room].classRoomMatrix, null, 2));

    configData.data.room[room].classRoomMatrix.forEach(function (row) {
       row.forEach(function (cell) {
           workstations.forEach(function (workstation) {
               //console.log(cell + " " + workstation.split(".")[0]);
               if (cell === workstation.split(".")[0]) {
                   let elem = createMapElement(workstation.split(".")[0]);
                   document.getElementById("mapdiv").appendChild(elem);
               }
           });
           if (cell === "null") {
               let elem = createMapElement("");
               document.getElementById("mapdiv").appendChild(elem);
           }
       });
    });
}

function getAllWorkstations(configData, room) {
    let workstations = [];
    let roomData = configData.data.room[room];
    roomData.pc.forEach(function (workstation) {
        workstations.push(workstation);
    })

    return workstations;
}

function createMapElement(title) {
    let div = document.createElement("div");
    div.textContent = title;
    div.style.width = "120px";
    div.style.height = "120px";
    div.style.textAlign = "center";

    if (title !== "") {

        div.style.border = "1px solid black";

    }
    div.style.verticalAlign = "middle";
    div.style.lineHeight = "120px";


    return div;
}