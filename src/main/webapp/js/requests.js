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
    let responseRequest = await fetch("/requestListener");
    let data = await responseRequest.json();

    let responseConfigData = await fetch("data/config.json");
    let configData = await responseConfigData.json();

    const rooms = Object.values(configData.data.room);
    const allPcs = rooms.reduce((acc, pcs) => acc.concat(pcs), []);

    for (let i = 0; i < data.length; i++) {
        updateContent(data[i], allPcs);
    }
}


function updateContent(data, allPcs) {

    // Defining the instance name
    let instance = data.instance;

    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            if (allPcs.includes(instance)) {
                if (key === "isUP") {
                    if (data[key] === true) {
                        document.getElementById(data.instance + "_status").style.color = `#3cb371`;
                        document.getElementById(data.instance + "_status").innerText = "ONLINE";
                        document.getElementById(data.instance + "_card").style.borderColor = `#3cb371`;
                        document.getElementById(data.instance + "_img").setAttribute("src", "../../images/logo_ONLINE.png");
                    }
                } else if (key === "currentLoad") {
                    document.getElementById(instance + "_load").innerText = "Current load: " + data[key];
                } else if (key === "currentFreeMemory") {
                    document.getElementById(instance + "_currentFreeMemory").innerText = "Current free memory: " + data[key];
                } else if (key === "currentLoad5") {
                    document.getElementById(instance + "_loadlast5").innerText = "Load of the last 5 minutes: " + data[key];
                } else if (key === "currentAvailableMemory") {
                    document.getElementById(instance + "_availableMemory").innerText = "Current Available memory" + data[key];
                } else if (key === "temperature") {
                    document.getElementById(instance + "_temperature").innerText = "Temperature: " + data[key];
                }
            }
        }
    }
}

void handling();

setTimeout(function () {
    document.getElementById("nuc001.bin.bioinf.nl_load").innerText = "test.js";
}, 5000);
