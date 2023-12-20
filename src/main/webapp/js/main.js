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
    configData.data.room[room].classRoomMatrix.forEach(function (row) {
       row.forEach(function (cell) {
           workstations.forEach(function (workstation) {
              console.log(cell + " " + workstation);
           });

       });
    });

    /////////////////////////////////////////////
    /////////////////////////////////////////////

    // for (let row of configData.data.room[room].classRoomMatrix) {
    //     // console.log(row);
    //     for (let cell of row) {
    //         for (let pcLabel of workstations) {
    //             console.log(cell + " " + pcLabel.split('.')[0]);
    //             if (cell === pcLabel.split('.')[0]) {
    //                 console.log("FOUND: " + pcLabel.split('.')[0]);
    //             }
    //         }
    //     }
    // }

    /////////////////////////////////////////////
    /////////////////////////////////////////////

}

function getAllWorkstations(configData, room) {
    let workstations = [];
    let roomData = configData.data.room[room];
    roomData.pc.forEach(function (workstation) {
        workstations.push(workstation);
    })

    return workstations;
}