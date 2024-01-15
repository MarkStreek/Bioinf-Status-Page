function createCard(item) {
    let suggestionCard = document.createElement("div");

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

    let title = document.createElement("h3");
    title.innerText = item.instance.split('.')[0].toUpperCase();
    title.style.fontSize = "25px"; // Verhoogd naar 20px
    title.style.textAlign = "center";
    suggestionCard.appendChild(title);

    let button = document.createElement('button');
    button.classList = "btn btn-secondary btn-sm";
    button.textContent = "Show me " + item.instance.split('.')[0];
    button.id = "showMe_" + item.instance;
    suggestionCard.appendChild(button);

    button.addEventListener('click', function () {
        // retrieve the original card
        let highlight = document.getElementById(item.instance + "_card");

        function changeBorderColor() {
            if (highlight.style.backgroundColor === "orange") {
                highlight.style.backgroundColor = "#50C878";
            } else {
                highlight.style.backgroundColor = "orange";
            }
        }

        let intervalId = setInterval(changeBorderColor, 300);

        setTimeout(function() {
            clearInterval(intervalId);
            highlight.style.backgroundColor = "#50C878";
        }, 2000);

        // calculate the position of the card, so that it is in the middle of the screen after scrolling
        let y = highlight.getBoundingClientRect().top + window.pageYOffset - (window.innerHeight / 2);
        // scroll to the card
        window.scrollTo({top: y, behavior: 'auto'});
        // remove the border after 3 seconds
        setTimeout(function () {
            highlight.style.border = "2px solid grey"
        }, 2500);

    });

    return suggestionCard;

}