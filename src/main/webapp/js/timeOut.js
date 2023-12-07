setTimeout(function (){
    const elementsWithIds = document.querySelectorAll('[id]');
    elementsWithIds.forEach(element => {
        if (element.id.includes("_load")) {
            document.getElementById(element.id).innerText = "DEZE TEKTS IS VERANDERD";
        }
    });
    // console.log(allModalElementIds);
}, 500);
