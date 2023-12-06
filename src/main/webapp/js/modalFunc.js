function openModal(text) {
    document.getElementById('modal-text').innerText = text;
    document.getElementById('myModal').style.display = "block";
}

function closeModal() {
    document.getElementById('myModal').style.display = "none";
}

// Sluit de modal als er buiten de modal-content wordt geklikt
window.onclick = function(event) {
    let modal = document.getElementById('myModal');
    if (event.target === modal) {
        closeModal();
    }
}