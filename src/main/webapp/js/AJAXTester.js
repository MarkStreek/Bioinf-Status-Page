async function logMovies() {
    const response = await fetch("/D108");
    const movies = await response.json();
    const div = document.getElementById("somediv").textContent = movies;

}
setInterval(logMovies, 2000);
