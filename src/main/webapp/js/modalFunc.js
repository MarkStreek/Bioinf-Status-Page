function openModal(text) {
    // Pop-over button open event
    document.querySelector('.overlay').style.display = "block";
    document.getElementById('pc-title').innerText = text.split('.')[0];
    document.getElementById('modal-text').innerText = text;
    document.getElementById('myModal').style.display = "block";
}

function closeModal() {
    // Pop-over inside close (cross) event
    document.getElementById('myModal').style.display = "none";
    document.querySelector('.overlay').style.display = "none";
}

// Sluit de modal als er buiten de modal-content wordt geklikt
window.onclick = function(event) {
    // Pop-over outside close event
    let modal = document.getElementById('myModal');
    if (event.target === modal) {
        closeModal();
    }
}