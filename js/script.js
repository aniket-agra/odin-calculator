let displaySection = document.querySelector(".display");

let buttonSection = document.querySelector(".buttons");
for (let i = 0; i < 4; i++) {
    let buttonRow = document.createElement("div");
    for (let j = 0; j < 4; j++) {
        let buttonCol = document.createElement("button");
        buttonCol.textContent = "#";
        buttonCol.addEventListener('click', function (e) {
            displaySection.textContent = buttonCol.textContent;
        });
        buttonRow.append(buttonCol);
    }
    buttonSection.append(buttonRow);
}