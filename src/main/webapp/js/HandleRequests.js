async function handling() {
    let response = await fetch("/requestListener");
    let data = await response.json();

    for (let i = 0; i < data.length; i++) {
        updateContent(data[i]);
    }
}

