let resultContainer = document.querySelector(".result-container");
let functionContainer = document.querySelector(".function-container");
let buttons = document.querySelectorAll("button");

let historyPara = document.querySelector(".history-para");
let inputPara = document.querySelector(".input-para");

let operations = ["+", "-", "×", "÷", "a"]

let calculationString = "";

buttons.forEach(button => {
    button.addEventListener("click", event => {
        let lastBtn = inputPara.textContent.at(-1);
        let currentBtn = button.getAttribute("id").at(-1);

        if (currentBtn === "r") { /*refers to clear*/
            inputPara.textContent = "";
            calculationString = "";

        } else if (currentBtn === "e") { /*refers to delete*/
            if (lastBtn === " ") inputPara.textContent = inputPara.textContent.slice(0, -3)
            else inputPara.textContent = inputPara.textContent.slice(0, -1)
            calculationString = calculationString.slice(0, -1);

        } else if (operations.includes(currentBtn)) {
            if (lastBtn === "." || !isNaN(lastBtn) && lastBtn !== " ") {
                inputPara.textContent += ` ${currentBtn} `;
                if (currentBtn === "×") calculationString += "*";
                else if (currentBtn === "÷") calculationString += "/";
                else calculationString += currentBtn;
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
        console.log(calculationString)
    })
})