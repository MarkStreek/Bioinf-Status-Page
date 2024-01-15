async function handlingUpdate() {
    let requestData, configData;

    try {
        [requestData, configData] = await getFetchData();
    } catch (error) {
        console.error("Failed to fetch data: ", error);
        return;
    }

    // Updating the data
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    console.log(`Updating the data at ${hours}:${minutes}:${seconds}`);

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
                    document.getElementById(instance + "_load").innerText = "Current load: " + data[key];
                    document.getElementById(instance + "_loadDirect").innerText = "Load: " + data[key];
                } else if (key === "currentFreeMemory") {
                    document.getElementById(instance + "_currentFreeMemory").innerText = "Current free memory: " + data[key];
                } else if (key === "currentLoad5") {
                    document.getElementById(instance + "_loadlast5").innerText = "Load of the last 5 minutes: " + data[key];
                } else if (key === "currentAvailableMemory") {
                    document.getElementById(instance + "_availableMemory").innerText = "Current Available memory: " + data[key];
                } else if (key === "temperature") {
                    document.getElementById(instance + "_temperature").innerText = "Temperature: " + data[key];
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
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
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