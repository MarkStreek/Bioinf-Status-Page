// Steps:
// 1. Get the results with fetch
// 2. Loop though the results and pass every instance to a new function
// 3. In the new function search for all the elements, i.e.g,
//     let load = document.getElementById('instance'_load");
//     let status = document.getElementById('instance'_status");
//     let memory = document.getElementById('instance'_memory");
//     let cpu = document.getElementById('instance'_cpu");
//     etc.
// 4. Change the values of the elements with the given values from results
// 5. Change the color of the status element

async function handling() {
    let response = await fetch("/requestListener");

    let data = await response.json();

    for (let i = 0; i < data.length; i++) {
        // parse data[i] to the function below
        //console.log(data[i]);
        updateContent(data[i]);
    }

}


function updateContent(data) {

    // Defining the instance name
    let instance = data.instance;

    console.log(data);

    if (instance.includes("nuc")) {
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                console.log(key + " -> " + data[key]);
                if (key === "currentLoad") {
                    document.getElementById(instance + "_load").innerText = data[key];
                } else if (key === "isUP") {
                    document.getElementById(instance + "_status").innerText = data[key];
                } else if (key === "currentFreeMemory") {
                    document.getElementById(instance + "_currentFreeMemory").innerText = data[key];
                } else if (key === "currentLoad5") {
                    console.log("currentLoad5: " + data[key]);
                    document.getElementById(instance + "_HIER").innerText = data[key];
                } else if (key === "currentAvailableMemory") {
                    // needs to be added!
                    console.log("currentAvailableMemory: " + data[key]);
                    //document.getElementById(instance + "_currentFreeMemory").innerText = data[key];
                }
            }
        }
    }

    // if (data === null) {
    //     throw new Error("Data is null");
    // } else for (let key of data) {
    //     if (key === "load") {
    //         // test this with console.log(data.key);
    //         console.log("LOAD: " + data.key);
    //         console.log("DATA: " + data);
    //         document.getElementById(key);//.innerText = data.key;
    //     } else if (key === "status") {
    //         document.getElementById(key);//.innerText = data.key;
    //     } else if (key === "memory") {
    //         document.getElementById(key);//.innerText = data.key;
    //     }


    // Change the picture of the status!
    // let statusTextObject = document.getElementById(data.instance + "_status");
    // let newDiv1 = document.getElementById(data.instance + "_card");
    // let logoImageObject = document.getElementById(data.instance + "_img");
    //
    // if (data.status === true) {
    //     statusTextObject.style.color = `#3cb371`;
    //     newDiv1.style.borderColor = `#3cb371`;
    //     logoImageObject.setAttribute("src", "../../images/logo_ONLINE.png");
    // } else {
    //     statusTextObject.style.color = `#ff0000`;
    //     newDiv1.style.borderColor = `#ff0000`;
    //     logoImageObject.setAttribute("src", "../../images/logo_OFFLINE.png");
    // }

}

void handling();

setTimeout(function () {
    document.getElementById("nuc001.bin.bioinf.nl_load").innerText = "test.js";
}, 5000);
