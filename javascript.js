let resultContainer = document.querySelector(".result-container");
let functionContainer = document.querySelector(".function-container");
let buttons = document.querySelectorAll("button");

let historyPara = document.querySelector(".history-para");
let inputPara = document.querySelector(".input-para");

let operations = ["+", "-", "×", "÷"]

let calculationString = "";

buttons.forEach(button => {
    button.addEventListener("click", event => {
        let lastBtn = inputPara.textContent.at(-1);
        let currentBtn = button.getAttribute("id").at(-1);

        if (currentBtn !== "n") {
            historyPara.textContent = "";
        }

        if (currentBtn === "r") { /*refers to clear*/
            inputPara.textContent = "";
            calculationString = "";

        } else if (currentBtn === "e") { /*refers to delete*/
            if (inputPara.textContent.includes("Infinity")) {
                inputPara.textContent = "";
                calculationString = "";
            }
            if (lastBtn === " ") inputPara.textContent = inputPara.textContent.slice(0, -3)
            else inputPara.textContent = inputPara.textContent.slice(0, -1)
            calculationString = calculationString.slice(0, -1);

        } else if (currentBtn === "n") { /*refers to equation*/
            if (!operations.includes(calculationString.at(-1)) && inputPara.textContent !== "" && isNaN(inputPara.textContent)) {

                if (calculationString.at(-1) === ".") inputPara.textContent = "Error";

                else if (inputPara.textContent.includes("-Infinity")) {
                    historyPara.textContent = inputPara.textContent + " ="
                    inputPara.textContent = "-Infinity";
                    calculationString = inputPara.textContent;
                }

                else if (inputPara.textContent.includes("Infinity")) {
                    historyPara.textContent = inputPara.textContent + " ="
                    inputPara.textContent = "Infinity";
                    calculationString = inputPara.textContent;
                }

                else {
                    historyPara.textContent = inputPara.textContent + " ="
                    inputPara.textContent = calculate(calculationString);
                    calculationString = calculate(calculationString);
                }
            }

        } else if (currentBtn === "÷" || currentBtn === "×") {
            if (lastBtn === "." || !isNaN(lastBtn) && lastBtn !== " ") {
                inputPara.textContent += ` ${currentBtn} `;

                calculationString += currentBtn;
            }

        } else if (currentBtn === "-" || currentBtn === "+") {
            if (lastBtn !== " ") {
                inputPara.textContent += ` ${currentBtn} `;
                calculationString += currentBtn;
            }

        } else if (currentBtn === ".") {
            if (!isNaN(lastBtn) && lastBtn !== " ") {
                inputPara.textContent += currentBtn;
                calculationString += currentBtn;
            }

        } else {
            if (lastBtn === "0" && (inputPara.textContent.at(-2) === " " || !inputPara.textContent.at(-2))) {
                inputPara.textContent = inputPara.textContent.slice(0, -1) + currentBtn;
                calculationString = calculationString.slice(0, -1) + currentBtn;
            } else {
                inputPara.textContent += currentBtn;
                calculationString += currentBtn;
            }
        }
    })
})


function calculate(string) {
    let operators1 = string.split("").filter((operator, index) => index > 0 && (operator === "÷" || operator === "×"));
    let operators2 = string.split("").filter((operator, index) => index > 0 && (operator === "-" || operator === "+"));

    operators1.forEach(operator => string = operate(string, operator));
    operators2.forEach(operator => string = operate(string, operator));

    if (!string.endsWith("y") && +string % 1 !== 0 && string.length-string.indexOf(".") > 5) return (+string).toFixed(5);
    return string;
}

function operate(string, operator) {
    let operationIndex = string.indexOf(operator, 1);

    if (operationIndex === -1) return string;

    let previousOperationIndex = -1;
    let followingOperationIndex = string.length + 1;

    for (let i = operationIndex-1; i > 0; --i) {
        if (operations.includes(string[i])) {
            previousOperationIndex = i;
            break;
        }
    }

    for (let i = operationIndex+1; i <= string.length; ++i) {
        if (operations.includes(string[i])) {
            followingOperationIndex = i;
            break;
        }
    }

    let firstNum = +string.slice(previousOperationIndex+1, operationIndex);
    let secondNum = +string.slice(operationIndex+1, followingOperationIndex);

    let result;

    switch (operator) {
        case "+":
            result = firstNum + secondNum;
            break;
        case "-": 
            result = firstNum - secondNum;
            break;
        case "×": 
            result = firstNum * secondNum;
            break;
        case "÷":
            result = firstNum / secondNum;
    }

    return string.slice(0, previousOperationIndex+1) + result + string.slice(followingOperationIndex);
}