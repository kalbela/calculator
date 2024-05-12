let resultContainer = document.querySelector(".result-container");
let functionContainer = document.querySelector(".function-container");
let buttons = document.querySelectorAll("button");

let historyPara = document.querySelector(".history-para");
let inputPara = document.querySelector(".input-para");

let operations = ["-", "+", "×", "÷"]

let calculationString = "";

buttons.forEach(button => {
    button.addEventListener("click", event => {
        let secondLastBtn = inputPara.textContent.at(-2);
        let lastBtn = inputPara.textContent.at(-1);
        let currentBtn = button.getAttribute("id").at(-1);

        let lastIndexOfOperator = inputPara.textContent.split("").findLastIndex(item => operations.includes(item));

        resultContainer.scrollLeft = 0;

        if (currentBtn === "r") { /*refers to clear*/
            inputPara.textContent = "";
            calculationString = "";

        } else if (currentBtn === "e") { /*refers to delete*/
            if (inputPara.textContent === "Error") {
                inputPara.textContent = "";
                calculationString = "";
            } else if (inputPara.textContent.endsWith("Infinity")) {
                inputPara.textContent = inputPara.textContent.slice(0, -8);
                calculationString = calculationString.slice(0, -7); 

            } else if (inputPara.textContent[lastIndexOfOperator - 1] === "e") {
                inputPara.textContent = "";
                calculationString = "";

            } else if (lastBtn === " ") inputPara.textContent = inputPara.textContent.slice(0, -3)

            else inputPara.textContent = inputPara.textContent.slice(0, -1)
            calculationString = calculationString.slice(0, -1);

        } else if (currentBtn === "n") { /*refers to equation*/
            if (!operations.includes(calculationString.at(-1)) && inputPara.textContent !== "" && isNaN(inputPara.textContent) && inputPara.textContent !== "." && inputPara.textContent !== "Error") {

                historyPara.textContent = inputPara.textContent + " =";
                inputPara.textContent = calculate(calculationString);
                calculationString = inputPara.textContent;
            }

        } else if (operations.includes(currentBtn, 1)) {
            if (lastBtn === "y" || (lastBtn === "." && !isNaN(secondLastBtn) && secondLastBtn !== " ") || (!isNaN(lastBtn) && lastBtn !== " ")) {
                inputPara.textContent += ` ${currentBtn} `;

                calculationString += currentBtn;
            }

        } else if (currentBtn === "-") {
            if (inputPara.textContent === "Error") {
                inputPara.textContent = "";
                calculationString = "";
            }
            if (inputPara.textContent === "" || secondLastBtn === "÷" || secondLastBtn === "×") {
                inputPara.textContent += `${currentBtn}`;
                calculationString += currentBtn;
            } else if (lastBtn === "y" || (lastBtn !== " " && !isNaN(lastBtn)) || (lastBtn === "." && !isNaN(secondLastBtn) && secondLastBtn !== " ")) {
                inputPara.textContent += ` ${currentBtn} `;
                calculationString += currentBtn;
            }

        } else if (currentBtn === ".") {
            if (inputPara.textContent === "Error") {
                inputPara.textContent = "";
                calculationString = "";
            }
            if (inputPara.textContent[lastIndexOfOperator-1] === "e" || inputPara.textContent.endsWith("y")) {
                if (historyPara.textContent !== "") {
                    inputPara.textContent = ".";
                    calculationString = ".";
                }
            } else if (!inputPara.textContent.includes(".") || lastIndexOfOperator > inputPara.textContent.lastIndexOf(".")) {
                inputPara.textContent += currentBtn;
                calculationString += currentBtn;
            }

        } else {
            if (inputPara.textContent === "Error") {
                inputPara.textContent = "";
                calculationString = "";
            }
            if (inputPara.textContent.endsWith("y")) {
                if (historyPara.textContent !== "") {
                    inputPara.textContent = currentBtn;
                    calculationString = currentBtn;
                }
            } else if (lastBtn === "0" && (secondLastBtn === "-" || secondLastBtn === " " || !secondLastBtn)) {
                inputPara.textContent = inputPara.textContent.slice(0, -1) + currentBtn;
                calculationString = calculationString.slice(0, -1) + currentBtn;
            } else {
                inputPara.textContent += currentBtn;
                calculationString += currentBtn;
            }
        }

        if (currentBtn !== "n") {
            if (!(inputPara.textContent === "Error" && operations.includes(currentBtn, 1))){
                historyPara.textContent = "";
            }
        }
    })
})


function calculate(string) {
    let operators1 = string.split("").filter((operator, index) => index > 0 && (operator === "÷" || operator === "×"));
    let operators2 = string.split("").filter((operator, index) => index > 0 && (operator === "-" || operator === "+"));

    operators1.forEach(operator => string = operate(string, operator));
    operators2.forEach(operator => string = operate(string, operator));

    return convertToFixedDigit(string);
}

function convertToFixedDigit(number) {
    if (number === "NaN") return "Error";
    else if (number.endsWith("y")) return number;
    else if (number.includes("e")) {
        let parts = number.split("e");
        let firstPart = parts[0];
        firstPart = +(+firstPart).toFixed(3);
        return firstPart + "e" + parts[1];
    } else {
        return +(+number).toFixed(7);
    }
}

function operate(string, operator) {
    let operationIndex = -1;

    for (let i = 0; i < string.length; ++i) {
        if (string[i] === operator && string[i-1] !== "e") {
            operationIndex = i;
            break;
        }
    }

    if (operationIndex === -1) return string;

    let previousOperationIndex = -1;
    let followingOperationIndex = string.length;

    for (let i = operationIndex-1; i > 0; --i) {
        if (operations.includes(string[i]) && !operations.includes(string[i-1]) && string[i-1] !== "e") {
            previousOperationIndex = i;
            break;
        }
    }

    for (let i = operationIndex+1; i <= string.length; ++i) {
        if (operations.includes(string[i]) && !operations.includes(string[i-1]) && string[i-1] !== "e") {
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