const n = 200;
const status = ['ONLINE', 'OFFLINE'];
const innerDiv = document.getElementById("innerdiv");
for (let i = 0; i < n; i++) {
    const chooseRandomStatus = status[Math.floor(Math.random() * status.length)];
    const newDivObject = document.createElement('div');
    newDivObject.classList.add('col', 'border', 'border-1', 'border-primary');
    newDivObject.style.padding = `15px`;
    newDivObject.style.position = `relative`;
    newDivObject.style.margin = `${Math.sqrt(n)}px`
    newDivObject.style.backgroundColor = `#4a5766`;

    const pcObject= document.createElement('computerLabel');
    pcObject.textContent = `nuc${i}\n`;
    pcObject.classList.add("pc");
    pcObject.style.color = `#f9f9f9`;
    const statusTextObject = document.createElement('statusLabel');
    statusTextObject.textContent = `${chooseRandomStatus}`;
    statusTextObject.classList.add("status")

    newDivObject.appendChild(pcObject);
    newDivObject.appendChild(statusTextObject);

    if (chooseRandomStatus === "ONLINE") {
        statusTextObject.style.color = `#3cb371`;
    } else {
        statusTextObject.style.color = `#ff0000`;
    }

    innerDiv.appendChild(newDivObject);
}
