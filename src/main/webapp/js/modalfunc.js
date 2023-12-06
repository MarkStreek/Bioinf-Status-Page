function openModal(text) {
    document.getElementById('modal-text').innerText = text;
    $('#myModal').modal('show');
}

function closeModal() {
    $('#myModal').modal('hide');
}

// Sluit de modal als er buiten de modal-content wordt geklikt
window.onclick = function(event) {
    let modal = document.getElementById("myModal");
    if (event.target === modal) {
        closeModal();
    }
}



