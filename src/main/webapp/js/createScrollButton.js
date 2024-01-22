let scrollButton = document.getElementById("btn-page-up");

// Start show button event after scroll
window.onscroll = function () {
    showScrollButton();
};

function showScrollButton() {
    if (
        document.body.scrollTop > 10 ||
        document.documentElement.scrollTop > 10
    ) { // causes the button to show after performing 1 scroll
        scrollButton.style.display = "block";
    } else {
        // causes the button to disappear when at top of page
        scrollButton.style.display = "none"
    }
}

// Start scroll up when on-click event is activated
scrollButton.addEventListener("click", scrollPageUp);

function scrollPageUp() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}