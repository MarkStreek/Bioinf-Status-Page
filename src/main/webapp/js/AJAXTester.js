async function logMovies() {
    let response = await fetch("/D108");
    let movies = await response.json();
    //alert(movies.url);
    let div = document.getElementById("somediv").textContent = movies.text;
    let someh3= document.getElementById("someh3").textContent = movies.text;

}
setInterval(logMovies, 2000);
