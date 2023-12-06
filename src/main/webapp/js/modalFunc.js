function openModal(text) {
    document.querySelector('.overlay').style.display = "block";
    document.getElementById('pc-title').innerText = text.split('.')[0];
    document.getElementById('modal-text').innerText = text;
    document.getElementById('myModal').style.display = "block";
}

function closeModal() {
    document.getElementById('myModal').style.display = "none";
    document.querySelector('.overlay').style.display = "none";
}

// Sluit de modal als er buiten de modal-content wordt geklikt
window.onclick = function(event) {
    let modal = document.getElementById('myModal');
    if (event.target === modal) {
        closeModal();
    }
}