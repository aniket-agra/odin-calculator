let displaySection = document.querySelector(".display");

let currentExpr = [];

function operate(operator, operand1, operand2) {
    switch(operator) {
        case "+" : return operand1 + operand2;
        case "-" : return operand1 - operand2;
        case "*" : return operand1 * operand2;
        case "/" : return operand1 / operand2;
        default  : return "Operation not supported";
    }
}

function evalExpr(expression = currentExpr) {
    // extract entries one by one from left 3 at a time and try to evaluate
    let result = expression.shift();
    // if evaluation fails NaN or undefined is returned
    if (!isNaN(result) && result !== undefined) {
        while (expression.length !== 0) {
            let operator = expression.shift();
            let operand = expression.shift();
            result = operate(operator, Number(result), Number(operand));
        }
    }
    else {
        alert("Invalid Input! Please try again.")
    }
}
// evalExpr(["12", "+", "7", "-", "-", "*", "3"]);
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