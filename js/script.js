let displaySection = document.querySelector(".display");

let currentExpr = [];

function evalExpr() {
    
}

function clickFunction() {
    // get clicked button
    let clickedButton = this.textContent;
    let clickedNumber = Number(clickedButton);
    if (!isNaN(clickedNumber)) {
        // show clicked value of number
        displaySection.textContent = this.textContent;
    }
    currentExpr.push(clickedButton);
    if (clickedButton === "=")
        evalExpr();
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