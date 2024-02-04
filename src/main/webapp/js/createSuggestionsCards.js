/*
Creates a suggestion card object with a given workstation name
@param item: label that contains a workstation name
@return suggestionCard: suggestion card with button that makes the window scroll to its corresponding workstation card
*/
function createCard(item) {
    let suggestionCard = document.createElement("div");
    // Styling a custom shape
    suggestionCard.style.display = "flex";
    suggestionCard.style.flexDirection = "column";
    suggestionCard.style.justifyContent = "center";
    suggestionCard.style.fontWeight = "600";
    suggestionCard.style.width = "250px";
    suggestionCard.style.height = "125px";
    suggestionCard.style.borderRadius = "5px";
    suggestionCard.style.margin = "12px";
    suggestionCard.style.border = "2px solid grey";
    suggestionCard.style.backgroundColor = "#50C878";
    suggestionCard.style.boxShadow = "4px 4px 15px grey";

    // Assign workstation name as title and set a custom font appearance
    let title = document.createElement("h3");
    title.innerText = item.instance.split('.')[0].toUpperCase();
    title.style.fontSize = "25px";
    title.style.fontFamily = "Cambria, sans-serif";
    title.style.textAlign = "center";
    suggestionCard.appendChild(title);

    // Add a button with an on-click event
    let button = document.createElement('button');
    button.classList = "btn btn-secondary btn-sm";
    button.textContent = "Show me " + item.instance.split('.')[0];
    button.id = "showMe_" + item.instance;
    suggestionCard.appendChild(button);

    // The on-click event scrolls from the pressed button on the suggestion card
    // to its corresponding workstation card
    button.addEventListener('click', function () {
        // retrieve the original card
        let highlight = document.getElementById(item.instance + "_card");

        /*
        Change the background color of the workstation card to orange (stands out).
        Its purpose is to make the user able to find the suggested workstation card.
        And, if it's already orange it's color will be returned to green.
        */
        function changeBorderColor() {
            if (highlight.style.backgroundColor === "orange") {
                highlight.style.backgroundColor = "#50C878";
            } else {
                highlight.style.backgroundColor = "orange";
            }
        }
        // Sets the color change to 300ms.
        let intervalId = setInterval(changeBorderColor, 300);
        // Sets an overall time limit of 2000ms for changing the background color from green to orange back to back
        setTimeout(function() {
            clearInterval(intervalId);
            highlight.style.backgroundColor = "#50C878";
        }, 2000);

        // Calculate the position of the card, so that it is in the middle of the screen after scrolling
        let y = highlight.getBoundingClientRect().top + window.pageYOffset - (window.innerHeight / 2);
        // Scroll to the card
        window.scrollTo({top: y, behavior: 'auto'});
    });
    
    return suggestionCard;
}