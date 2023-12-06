async function handleRequest() {
    let response = await fetch("/requestListener");
    let data = await response.json();

    alert(data)
}
