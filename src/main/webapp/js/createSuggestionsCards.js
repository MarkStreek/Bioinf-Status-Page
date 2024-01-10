function createCard(item) {
    let suggestionCard = document.createElement("div");

    console.log(JSON.stringify(item, null, 4));

    suggestionCard.style.display = "flex";
    suggestionCard.style.flexDirection = "column";
    suggestionCard.style.justifyContent = "center";
    suggestionCard.style.fontWeight = "600";
    suggestionCard.style.width = "200px";
    suggestionCard.style.height = "100px";
    suggestionCard.style.borderRadius = "5px";
    suggestionCard.style.margin = "10px";
    suggestionCard.style.border = "2px solid grey";
    suggestionCard.style.backgroundColor = "#50C878";
    suggestionCard.style.boxShadow = "4px 4px 15px grey";

    let title = document.createElement("h3");
    title.innerText = item.instance.split('.')[0];
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
        highlight.style.backgroundColor = "orange";
        // calculate the position of the card, so that it is in the middle of the screen after scrolling
        let y = highlight.getBoundingClientRect().top + window.pageYOffset - (window.innerHeight / 2);
        // scroll to the card
        window.scrollTo({top: y, behavior: 'auto'});

    });

    return suggestionCard;

}