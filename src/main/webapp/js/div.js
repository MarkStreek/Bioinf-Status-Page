const n = 200;
const status = ['ONLINE', 'OFFLINE'];
const innerDiv = document.getElementById("innerdiv");
for (let i = 0; i < n; i++) {
    const chooseRandomStatus = status[Math.floor(Math.random() * status.length)];

    // New main div
    const newDivMain = document.createElement('div');
    newDivMain.classList.add('col');

    // New Subdiv
    const newDiv1 = document.createElement('div');
    newDiv1.classList.add('card', 'border-1');
    newDiv1.style.backgroundColor = `#4a5766`;

    // New Subdiv - card body
    const newDiv2 = document.createElement('div');
    newDiv2.classList.add('card-body');
    newDiv2.style.color = `#4a5766`;

    // Title for which pc
    const PCTitle= document.createElement('h4');
    PCTitle.textContent = `Server NUC${i}\n`;
    PCTitle.classList.add('card-title');
    PCTitle.style.color = `#f9f9f9`;

    // Title for the stus
    const StatusTitle = document.createElement('p');
    StatusTitle.classList.add('card-text');
    StatusTitle.style.color = `#f9f9f9`;
    StatusTitle.textContent = `Server Status: `;

    // Status element red/green
    const statusTextObject = document.createElement('span');
    statusTextObject.textContent = `${chooseRandomStatus}`;
    statusTextObject.classList.add("status")

    // append all elements to the right parent elements
    newDivMain.appendChild(newDiv1);
    newDiv1.appendChild(newDiv2);
    newDiv2.appendChild(PCTitle);
    newDiv2.appendChild(StatusTitle);
    StatusTitle.appendChild(statusTextObject);

    // Changing the color
    if (chooseRandomStatus === "ONLINE") {
        statusTextObject.style.color = `#3cb371`;
        newDiv1.style.borderColor = `#3cb371`;
    } else {
        statusTextObject.style.color = `#ff0000`;
        newDiv1.style.borderColor = `#ff0000`;
    }
    // Inserting new div
    innerDiv.appendChild(newDivMain);
}
