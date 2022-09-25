let displaySection = document.querySelector(".display");

let currentExpr = [];
let rewriteDisplay = true;

function operate(operator, operand1, operand2) {
    switch(operator) {
        case "+" : return operand1 + operand2;
        case "-" : return operand1 - operand2;
        case "x" : return operand1 * operand2;
        case "÷" : return operand1 / operand2;
        default  : return "Operation not supported";
    }
}

function evalExpr(expression = currentExpr) {
    // get 3 entries one by one from left and try to evaluate - do NOT update expression array
    // expression array updated in clickFunction() 
    let operand1 = expression[0];
    let operator = expression[1];
    let operand2 = expression[2];
    let result = operate(operator, Number(operand1), Number(operand2));
     return result;
}

function clickFunction() {
    // get clicked button
    let clickedButton = this.textContent;
    let clickedNumber = Number(clickedButton);
    // check if clicked button is number or operator
    if (this.classList[0] === "number") {
        // if number check if display to be re-written
        if (rewriteDisplay) {
            // if yes, rewrite display with clicked number, unset display for rewrite
            displaySection.textContent = clickedButton;
            rewriteDisplay = !rewriteDisplay;
        }
        else {
            // else append to current display
            displaySection.textContent += clickedButton;
        }
    }
    else {
        // if operator 
            if (!rewriteDisplay) {
                // if rewrite is false - user has entered a number and pushed operator
                // push displayed number
                currentExpr.push(displaySection.textContent);
                // evaluate expression 
                let result = evalExpr(currentExpr);
                // if result is number display result, empty expression array, and push result
                if (!isNaN(result)) {
                    displaySection.textContent = result.toFixed(2);
                    currentExpr = [result];
                }
                // set display for rewrite
                rewriteDisplay = true;
            }
            // if rewrite is true - displayed number has been pushed or starting out
            if (rewriteDisplay) {
                // check if last entry is operator only if not starting out
                if (currentExpr.length > 0) {
                    // if last entry is number keep as is else pop
                    let lastEntry = currentExpr.pop();
                    if (!isNaN(Number(lastEntry)))
                        currentExpr.push(lastEntry);
                    // push current operator
                    currentExpr.push(clickedButton);
                }
            }
    }   
    if (clickedButton === "=") {
        // if operator is "=" display result and allow for pushing other operators
        // by emptying current expression as next operator push will cause displayed number 
        // to be added to current expression
        currentExpr = [];
        // rewrite display
        rewriteDisplay = true;
    }
    if (clickedButton === "c") {
        currentExpr = [];
        displaySection.textContent = "0";
        rewriteDisplay = true;
    }       
}

let buttonSection = document.querySelector(".buttons");
for (let i = 0; i < 5; i++) {
    let buttonRow = document.createElement("div");
    buttonRow.setAttribute("id", `row${i}`);
    for (let j = 0; j < 4; j++) {
        let buttonCol = document.createElement("button");
        // if column is not first put numbers 1 through 9 on rows 0 to 2
        if (j > 0 && i <= 2) {
            buttonCol.textContent = `${3 * (2 - i) + j}`;
            buttonCol.classList.add("number");
        }
        switch(`${i}${j}`) {
            case "00" : buttonCol.textContent = "+"; 
                        buttonCol.classList.add("operator");
                        break;
            case "10" : buttonCol.textContent = "-"; 
                        buttonCol.classList.add("operator");
                        break;
            case "20" : buttonCol.textContent = "x"; 
                        buttonCol.classList.add("operator");
                        break;
            case "30" : buttonCol.textContent = "÷"; 
                        buttonCol.classList.add("operator");
                        break;
            case "31" : buttonCol.textContent = ".";
                        buttonCol.classList.add("number");
                        break;
            case "32" : buttonCol.textContent = "0"; 
                        buttonCol.classList.add("number");
                        break;
            case "33" : buttonCol.textContent = "c"; 
                        buttonCol.classList.add("operator");
                        break;
            case "40" : buttonCol.textContent = "="; 
                        buttonCol.classList.add("operator");
                        break;
            
        }
        buttonCol.setAttribute("id", `col${j}`);
        buttonCol.addEventListener('mouseover', e => e.target.style.scale = 1.1);
        buttonCol.addEventListener('mouseleave', e => e.target.style.scale = 1);
        buttonCol.addEventListener('click', clickFunction);
        if (! (i == 4 && j > 0))
            buttonRow.append(buttonCol);
    }
    buttonSection.append(buttonRow);
}

let bodySection = document.querySelector("body");
let script = document.querySelector("script");

let instructionSection = document.createElement("div");
instructionSection.classList.add("instructions");
let instructionList = document.createElement("ol");
for (let i = 0; i < 3; i++) {
    let instruction = document.createElement("li");
    switch(i) {
        case 0 : instruction.textContent = "Calculation starts only after entering a number. Any " +
                                            "entries before that are ignored.";
                break;
        case 1 : instruction.textContent = "In case of pressing consecutive operators after " +
                                            "entering a number, only the last operator is used. ";
                break;  
        case 2 : instruction.textContent = "To continue calculation after pressing '=' " +
                                            "simply press the next operator."
                break;
    }
    instructionList.appendChild(instruction);
}
instructionSection.appendChild(instructionList);
bodySection.insertBefore(instructionSection, script);