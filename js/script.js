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
        result = "Invalid Input! Please try again.";
    }
    return result;
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
    if (clickedButton === "=") {
        currentExpr.pop();
        displaySection.textContent = evalExpr();
    }
        
}

let buttonSection = document.querySelector(".buttons");
for (let i = 0; i < 4; i++) {
    let buttonRow = document.createElement("div");
    for (let j = 0; j < 4; j++) {
        let buttonCol = document.createElement("button");
        // if column is not first put numbers 1 through 9 on rows 0 to 2
        if (j > 0 && i <= 2) {
            buttonCol.textContent = `${3 * (2 - i) + j}`;
        }
        switch(`${i}${j}`) {
            case "00" : buttonCol.textContent = "+"; break;
            case "10" : buttonCol.textContent = "-"; break;
            case "20" : buttonCol.textContent = "*"; break;
            case "30" : buttonCol.textContent = "/"; break;
            case "31" : buttonCol.textContent = "."; break;
            case "32" : buttonCol.textContent = "0"; break;
            case "33" : buttonCol.textContent = "="; break;
        }
        buttonCol.setAttribute("id", `${i}${j}`);
        buttonCol.addEventListener('click', clickFunction);
        buttonRow.append(buttonCol);
    }
    buttonSection.append(buttonRow);
}