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
        console.log(data[i]);
    }

}


function updateContent(data) {

    if (data === null) {
        throw new Error("Data is null");
    } else for (let key of data) {
        if (key === "load") {
            // test this with console.log(data.key);
            document.getElementById(key).innerText = data.key;

        }
    }
}

setTimeout(function () {
    document.getElementById("nuc001.bin.bioinf.nl_load").innerText = "test.js";
}, 5000);
