// Search for all buttons in html (Map) page
let buttons = document.querySelectorAll("button[type=button]");
// Pass buttonID to handleMap function if button is clicked
buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        let buttonID = button.id;
        void handleMap(buttonID);
    });
});

/*
Creates a map structure for a given room (buttonID) from the matrix of the config file
@param room: a buttonID that corresponds with a room name
*/
async function handleMap(room) {
    let configFile = await fetch("data/config.json");
    let configData = await configFile.json();
    // Get all workstations for the given room
    let workstations = getAllWorkstations(configData, room);
    // Get div object (to be filled with the matrix later on)
    let mapDiv = document.getElementById("mapdiv");
    // Specify the maximum width for the mapDiv object
    let maxLength = (configData.data.room[room].classRoomMatrix[0].length) * 150;
    maxLength += ((configData.data.room[room].classRoomMatrix[0].length) * 2 ) * 5;
    mapDiv.style.width = `${maxLength }px`;
    // Empty innerHTML to prevent piling of data
    mapDiv.innerHTML = "";
    // Extract each row of classRoomMatrix for room
    configData.data.room[room].classRoomMatrix.forEach(function (row) {
        // Loop over every index (cell)
        row.forEach(function (cell) {
            workstations.forEach(function (workstation) {
                // Check if cell name equals that of a workstation
                if (cell === workstation.split(".")[0]) {
                    // Invoke creation of a map by creating a div for each workstation
                    let elem = createMapDiv(workstation);
                    document.getElementById("mapdiv").appendChild(elem);
                }
            });
            // Create an empty div object for indices with a value of null
            if (cell === "null") {
                let elem = createMapDiv("");
                document.getElementById("mapdiv").appendChild(elem);
            }
        });
    });
    // function for updating the data inside the map
    void updateMapElements(workstations);
}

/*
Retrieves all workstations for a given room
@param configData, room: contents of config file, name of a room
@return workstations: list of workstations objects
*/
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
    @return div: the custom div object
 */
function createMapDiv(workstation) {
    let div = document.createElement("div");
    // Styling custom shape of div
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

/*
Handles updating map elements contents
@param workstations: list of all workstations of a given room
*/
async function updateMapElements(workstations) {
    let request = await fetch("/requestListener");
    let data = await request.json();

    let responseConfigData = await fetch("data/config.json");
    let configData = await responseConfigData.json();

    // Extract rooms from config object and then get all pcs
    let rooms = Object.values(configData.data.room);
    let allPcs = rooms.reduce((acc, roomData) => acc.concat(roomData.pc), []);

    // Assign green color and "Online" label to divElm that ísUP
    data.forEach(({ instance, isUP }) => {
        if (allPcs.includes(instance) && workstations.includes(instance) && isUP) {
            let divElm = document.getElementById(instance + "_map");
            divElm.style.backgroundColor = "#50C878";
            divElm.children[1].textContent = "Online";
        }
    });
}

// Get information about the button's state of being pressed and set up a validation list for the classroom.
let urlParams = new URLSearchParams(window.location.search);
let buttonPressed = urlParams.get('button');
let validLocals = ['H186', 'H188A', 'Server', 'D107', 'D108', 'H1122'];
console.log(buttonPressed);

// If the button is pressed and that button is in an existing classroom,
// then invoke the creation of the classroom map
if (buttonPressed !== null && validLocals.includes(buttonPressed)) {
    console.log("button pressed: " + buttonPressed);
    void handleMap(buttonPressed);
}