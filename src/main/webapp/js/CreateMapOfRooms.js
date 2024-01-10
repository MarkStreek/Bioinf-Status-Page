document.body.style.backgroundColor = "lightgrey";
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
    let maxLength = (configData.data.room[room].classRoomMatrix[0].length) * 150;
    maxLength += ((configData.data.room[room].classRoomMatrix[0].length) * 2 ) * 5;
    mapDiv.style.width = `${maxLength }px`;
    mapDiv.innerHTML = "";


    configData.data.room[room].classRoomMatrix.forEach(function (row) {
        row.forEach(function (cell) {
            workstations.forEach(function (workstation) {
                if (cell === workstation.split(".")[0]) {
                    let elem = createMapDiv(workstation);
                    document.getElementById("mapdiv").appendChild(elem);
                }
            });
            if (cell === "null") {
                let elem = createMapDiv("");
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

/*
    Function that creates a div element for the map.
    It adds custom styling to the div element,
    if the workstation is not empty, it adds a border, and id to the div element.
    @param workstation: the workstation name
 */
function createMapDiv(workstation) {
    let div = document.createElement("div");
    div.style.display = "flex";
    div.style.flexDirection = "column";
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.fontWeight = "600";
    div.style.width = "150px";
    div.style.height = "150px";
    div.style.borderRadius = "5px";
    div.style.margin = "5px";

    if (workstation !== "") {
        div.style.border = "2px solid grey";
        div.style.backgroundColor = "#CC6482";
        div.id = workstation + "_map";
        // Add a soft shadow to the div.
        div.style.boxShadow = "4px 4px 15px grey";

        // Create title
        let title = document.createElement("div");
        title.textContent = workstation.split(".")[0];
        title.style.textAlign = "center";
        div.appendChild(title);

        // Create subtitle div
        let subtitle = document.createElement("div");
        subtitle.textContent = "Offline";
        subtitle.style.fontWeight = "400";
        subtitle.style.fontSize = "0.8em";
        subtitle.style.textAlign = "center";

        // Append subtitle to main div
        div.appendChild(subtitle);
    }

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
                            let divElm = document.getElementById(instance + "_map");
                            divElm.style.backgroundColor = "#50C878";
                            //console.log(divElm.children[1]);
                            divElm.children[1].textContent = "Online";
                        }
                    }
                }
            }
        }
    }
}