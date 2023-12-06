async function handleRequest() {
    let response = await fetch("/requestListener");
    let data = await response.json();

    for (let i = 0; i < data.length; i++) {
        updateContent(data[i]);
    }

}

// function updateContent(data) {
//     let load = data.instance + "_load";
//     let
//     let element = document.getElementById(load);
//     element.textContent = data.load;
// }