/**
 * Title: requests.js
 * Authors: Sibren, Luka and Mark
 * Copyright: Bioinf-Status-Page, 2023-2024
 *
 * This file is responsible for updating the status
 * of every workstation. That also includes making the plot
 * of the load history
 */

/*
Handle new request to fetch recent data from the server and
data from the config file by invoking 'getFetchData()' function.
Then get all pcs and invoke to update their contents.
Also pass an array with four 'top' pcs to 'createSuggestions()'
to make four pc suggestions.
*/
async function handlingUpdate() {
    let requestData, configData;

    try {
        [requestData, configData] = await getFetchData();
    } catch (error) {
        console.error("Failed to fetch data: ", error);
        return;
    }
    // Get all rooms
    const rooms = Object.values(configData.data.room);
    // Get all pcs and put their full labels in a list
    const allPcs = rooms.reduce((pcValue, roomData) => pcValue.concat(roomData.pc), []);
    // Invoke content updating
    requestData.forEach(data => updateContent(data, allPcs));

    // Create suggestions at top of page
    let slicedArray = requestData.slice(0, 4);
    void createSuggestions(slicedArray);
}

/*
Update (assign) contents of query keys to the corresponding HTML objects
@param data, allPcs: query data for specific keys and the list of all pc names
*/
function updateContent(data, allPcs) {
    let instance = data.instance;
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            if (allPcs.includes(instance)) {
                if (key === "isUP") { // Workstation online status
                    if (data[key] === true) {
                        document.getElementById(data.instance + "_status").innerText = "ONLINE";
                        document.getElementById(data.instance + "_status").style.color = "rgb(110, 117, 124)";
                        document.getElementById(data.instance + "_card").style.backgroundColor = "#50C878";
                    }
                } else if (key === "currentLoad") { // Current work load
                let loadElement = document.getElementById(instance + "_load");
                let loadDirectElement = document.getElementById(instance + "_loadDirect");
                // Update the text
                loadElement.innerText = "Current Load: " + data[key] + " %";
                loadDirectElement.innerText = "Load: " + data[key] + " %";

                // Remove the spinner styles
                loadDirectElement.style.animation = "";
                loadDirectElement.style.border = "";
                loadDirectElement.style.borderTop = "";
                loadDirectElement.style.marginBottom = "0";
                loadDirectElement.style.fontSize = "20px";
                loadDirectElement.style.width = "90%";

            } else if (key === "currentFreeMemory") { // Current amount of free memory
                    document.getElementById(instance + "_currentFreeMemory").innerText = "Current Free Memory: " + data[key] + " GB";
                } else if (key === "currentLoad5") { // Work load of last five minutes
                    document.getElementById(instance + "_loadlast5").innerText = "Load Last 5 Minutes: " + data[key] + " %";
                } else if (key === "currentAvailableMemory") { // Total available memory
                    document.getElementById(instance + "_availableMemory").innerText = "Total Available Memory: " + data[key] + " GB";
                } else if (key === "temperature") { // CPU temperature
                    document.getElementById(instance + "_temperature").innerText = "Temperature: " + data[key] + " °C";
                } else if (key === "currentLoadHistory") { // Current load history list
                    // From the list of one-decimal loads, an array is made with zero-decimal loads.
                    // Then the workstation instance and that array (load history) are passed to the 'createGraph()' function
                    if (data[key].length >= 1) {
                        let dataArr = data[key];
                        let dataArrFloat = dataArr.map(parseFloat);
                        void createGraph(instance, dataArrFloat);
                    }
                }
            }
        }
    }
}

/*
Update (assign) contents of query keys to the corresponding HTML objects
@param data, allPcs: query data for specific keys and the list of all pc names
*/
async function getFetchData() {
    // retrieve the workstation data
    let responseRequest = await fetch("/requestListener");
    let requestData = await responseRequest.json();
    // Retrieve the config file data
    let responseConfigData = await fetch("data/config.json");
    let configData = await responseConfigData.json();

    return [requestData, configData];
}

/*
Create four suggestion cards from the workstations inside the 'slicedArray'
@param slicedArray: Array with four top (lowest load) workstations
*/
function createSuggestions(slicedArray) {
    // Get suggestions div object
    let suggestions = document.getElementById("suggestions");
    // Remove previous suggestions
    while (suggestions.firstChild) {
        suggestions.removeChild(suggestions.firstChild);

    }
    // For each workstation item create a card and append that card to the suggestions div
    slicedArray.forEach((item) => {
        let cloneCard = createCard(item);
        suggestions.appendChild(cloneCard);
    });
}

/*
Create a graph of the load history
@param instance, dataArrFloat: workstation instance label, array of zero-decimal loads
*/
function createGraph(instance, dataArrFloat) {
    let id = instance + '_myChart';
    // Get drawing context for on a canvas
    let ctx = document.getElementById(id).getContext('2d');
    // Destroy id if already assigned to the Chart
    if (window[id] instanceof Chart) {
        window[id].destroy();
    }
    // Create a new Chart with drawing context. The main keys are type, data and options.
    // Type describes the line that's drawn between data points.
    // Data receives the array with work loads. The x-axis' labels are based on the length of the array (1-10)
    // The y-axis' labels and the graph itself form according to the load values
    // Options handles basic animation time settings and assigns axis titles.
    window[id] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from(Array(dataArrFloat.length).keys()),
            datasets: [{
                label: 'Load last 10 minutes',
                data: dataArrFloat,
                backgroundColor: '#F07C01',
                borderColor: '#F07C01',
                borderWidth: 1
            }]
        },
        options: {
            animation: {
                duration: 0,
            },
            hover: {
                animationDuration: 0,
            },
            responsiveAnimationDuration: 0,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Load (%)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Time (minutes)'
                    }
                }
            }
        }
    });
}