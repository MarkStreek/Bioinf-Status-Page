async function logMovies() {
    let response = await fetch("/D108");
    let movies = await response.json();


    let div = document.getElementById("somediv");
    let someh3 = document.createElement("p");
    someh3.textContent = movies.text + " Testing";

    let somep2 = document.getElementById("somep2");
    somep2.textContent = movies.text + " TESTING SOMEP2";


    div.appendChild(someh3);
}

setInterval(logMovies, 2000);