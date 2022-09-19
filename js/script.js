let displaySection = document.querySelector(".display");

function clickFunction() {
    console.log(this);
}

let buttonSection = document.querySelector(".buttons");
for (let i = 0; i < 4; i++) {
    let buttonRow = document.createElement("div");
    for (let j = 0; j < 4; j++) {
        let buttonCol = document.createElement("button");
        buttonCol.textContent = `${i * 4 + j}`;
        buttonCol.addEventListener('click', clickFunction);
        buttonRow.append(buttonCol);
    }
    buttonSection.append(buttonRow);
}