const n = 200;
const innerDiv = document.getElementById("innerdiv");
for (let i = 0; i < n; i++) {
    const newDivObject = document.createElement('div');
    newDivObject.classList.add('col', 'border', 'border-1', 'border-primary');
    newDivObject.textContent = '1';
    newDivObject.style.margin = `${Math.sqrt(n)}px`
    newDivObject.style.padding = `15px`;
    newDivObject.style.position = `relative`;
    innerDiv.appendChild(newDivObject);
}
