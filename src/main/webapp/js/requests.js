async function handlingUpdate() {
    let requestData, configData;

    try {
        [requestData, configData] = await getFetchData();
    } catch (error) {
        console.error("Failed to fetch data: ", error);
        return;
    }

    const rooms = Object.values(configData.data.room);
    const allPcs = rooms.reduce((acc, roomData) => acc.concat(roomData.pc), []);
    requestData.forEach(data => updateContent(data, allPcs));

    // create suggestions at top of page
    let slicedArray = requestData.slice(0, 4);
    void createSuggestions(slicedArray);
}

function updateContent(data, allPcs) {
    let instance = data.instance;
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            if (allPcs.includes(instance)) {
                if (key === "isUP") {
                    if (data[key] === true) {
                        document.getElementById(data.instance + "_status").innerText = "ONLINE";
                        document.getElementById(data.instance + "_status").style.color = "rgb(110, 117, 124)";
                        document.getElementById(data.instance + "_card").style.backgroundColor = "#50C878";
                    }
                } else if (key === "currentLoad") {
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

            } else if (key === "currentFreeMemory") {
                    document.getElementById(instance + "_currentFreeMemory").innerText = "Current Free Memory: " + data[key] + " GB";
                } else if (key === "currentLoad5") {
                    document.getElementById(instance + "_loadlast5").innerText = "Load Last 5 Minutes: " + data[key] + " %";
                } else if (key === "currentAvailableMemory") {
                    document.getElementById(instance + "_availableMemory").innerText = "Total Available Memory: " + data[key] + " GB";
                } else if (key === "temperature") {
                    document.getElementById(instance + "_temperature").innerText = "Temperature: " + data[key] + " °C";
                } else if (key === "currentLoadHistory") {
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

async function getFetchData() {
    // retrvieve the workstation data
    let responseRequest = await fetch("/requestListener");
    let requestData = await responseRequest.json();
    // retrieve the config file data
    let responseConfigData = await fetch("data/config.json");
    let configData = await responseConfigData.json();

    return [requestData, configData];
}

function createSuggestions(slicedArray) {

    let suggestions = document.getElementById("suggestions");
    while (suggestions.firstChild) {
        suggestions.removeChild(suggestions.firstChild);

    }
    slicedArray.forEach((item) => {
        let cloneCard = createCard(item);
        suggestions.appendChild(cloneCard);
    });
}

function createGraph(instance, dataArrFloat) {
    let id = instance + '_myChart';
    let ctx = document.getElementById(id).getContext('2d');

    if (window[id] instanceof Chart) {
        window[id].destroy();
    }
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