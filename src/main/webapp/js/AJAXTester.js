async function updateElement() {

    let response = await fetch("/D108");
    let movies = await response.json();

    alert(movies);


    let div = document.getElementById("somediv");
    let someh3 = document.createElement("p");
    someh3.textContent = movies.text + " Testing";

    let somep2 = document.getElementById("somep2");
    somep2.textContent = movies.text + " TESTING SOMEP2";


    div.appendChild(someh3);
}

setInterval(updateElement, 2000);