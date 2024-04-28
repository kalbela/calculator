let resultContainer = document.querySelector(".result-container");
let functionContainer = document.querySelector(".function-container");
let buttons = document.querySelectorAll("button");

let operations = ["+", "-", "×", "÷", "a"]

buttons.forEach(button => {
    button.addEventListener("click", event => {
        let lastBtn = resultContainer.textContent.at(-1);
        let currentBtn = button.getAttribute("id").at(-1);

        if (currentBtn === "r") { /*refers to clear*/
            resultContainer.textContent = "";

        } else if (currentBtn === "e") { /*refers to delete*/
            resultContainer.textContent = resultContainer.textContent.slice(0, -1)

        } else if (operations.includes(currentBtn)) {
            if (lastBtn === "." || !isNaN(lastBtn)) {
                resultContainer.textContent += currentBtn;
            }

        } else if (currentBtn === ".") {
            if (!isNaN(lastBtn)) {
                resultContainer.textContent += currentBtn;
            }

        } else {
            if (lastBtn === "0" && isNaN(resultContainer.textContent.at(-2))) {
                resultContainer.textContent = resultContainer.textContent.slice(0, -1) + currentBtn;
            } else {
                resultContainer.textContent += currentBtn;
            }
        }
    })
})