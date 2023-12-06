async function handleRequest() {
    let response = await fetch("/requestListener");
    let data = await response.json();



    console.log(JSON.stringify(data));

}
