/**
 * Title: CreateScrollButton.js
 * Authors: Sibren, Luka and Mark
 * Copyright: Bioinf-Status-Page, 2023-2024
 *
 * This file is responsible for the scroll button,
 * that appears when the user scrolls down the page.
 */

let scrollButton = document.getElementById("btn-page-up");

// Start show button event after scroll
window.onscroll = function () {
    showScrollButton();
};

/*
Show the button if the body's content is scrolled vertically over ten pixels
*/
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

/*
Set the location of the document's body to scroll to
*/
function scrollPageUp() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}