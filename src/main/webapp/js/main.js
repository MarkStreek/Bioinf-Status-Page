// get all the buttons with a querySelectorAll on type = button
let buttons = document.querySelectorAll("button[type=button]");
buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        let buttonID = button.id;
        void handleMap(buttonID);
    });
});

async function handleMap(room) {
    let configFile = await fetch("data/config.json");
    let configData = await configFile.json();

    let workstations = getAllWorkstations(configData, room);

    let mapDiv = document.getElementById("mapdiv");
    let maxLength = (configData.data.room[room].classRoomMatrix[0].length) * 120;
    mapDiv.style.width = `${maxLength}px`;
    mapDiv.innerHTML = "";


    configData.data.room[room].classRoomMatrix.forEach(function (row) {
       row.forEach(function (cell) {
           workstations.forEach(function (workstation) {
               //console.log(cell + " " + workstation.split(".")[0]);
               if (cell === workstation.split(".")[0]) {
                   let elem = createMapElement(workstation);
                   document.getElementById("mapdiv").appendChild(elem);
               }
           });
           if (cell === "null") {
               let elem = createMapElement("");
               document.getElementById("mapdiv").appendChild(elem);
           }
       });
    });
    void updateMapElements(workstations);
}

function getAllWorkstations(configData, room) {
    let workstations = [];
    let roomData = configData.data.room[room];
    roomData.pc.forEach(function (workstation) {
        workstations.push(workstation);
    })

    return workstations;
}

function createMapElement(workstation) {
    let div = document.createElement("div");
    div.textContent = workstation.split(".")[0];
    div.style.width = "120px";
    div.style.height = "120px";
    div.style.textAlign = "center";

    if (workstation !== "") {
        div.style.border = "1px solid red";
        div.id = workstation + "_map";
    }
    div.style.verticalAlign = "middle";
    div.style.lineHeight = "120px";

    return div;
}

async function updateMapElements(workstations) {
    let request = await fetch("/requestListener");
    let data = await request.json();

    let responseConfigData = await fetch("data/config.json");
    let configData = await responseConfigData.json();


    const rooms = Object.values(configData.data.room);
    const allPcs = rooms.reduce((acc, roomData) => acc.concat(roomData.pc), []);

    for (let i = 0; i < data.length; i++) {

        let instance = data[i].instance;

        for (let key in data[i]) {
                if (allPcs.includes(instance)) {
                    if (workstations.includes(instance)) {

                        if (key === "isUP") {
                            if (data[i][key] === true) {
                                console.log(instance + "_map");
                                console.log(document.getElementById(instance + "_map"));
                                document.getElementById(instance + "_map").style.backgroundColor = "green";
                            }
                        }
                    }
                }
        }
    }
}