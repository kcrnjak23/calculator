const numbers = document.querySelectorAll(".numberBtn");
const operations = document.querySelectorAll(".operationBtn");
const currentDisplay = document.getElementById("currentDisplay");
const previousDisplay = document.getElementById("previousDisplay");
const clearAll = document.querySelector(".clearAllBtn");
const equals = document.querySelector(".equlasBtn");

let previousNumber = "";
let currentNumber = "";
let lastOperator = "";
let finalResult = null;

numbers.forEach(button => {
    button.addEventListener("click", () => {
        if(button.innerHTML === "." && currentDisplay.innerHTML.includes(".")) return;
        currentNumber += button.innerHTML;
        currentDisplay.innerHTML = currentNumber;
    });
});

operations.forEach(button => {
    button.addEventListener("click", () => {
        if(currentDisplay.innerHTML === "" ) return;
        else{
            let lastChar = currentDisplay.innerHTML.slice(-1);
            const operatorName = button.innerHTML;
            if((operatorName === "+" || operatorName === "-" || operatorName === "*" || operatorName === "/")
              && (lastChar !== "+" && lastChar !== "-" && lastChar !== "*" && lastChar !== "/")){
                if(previousNumber && currentNumber && lastOperator){
                    mathOperation();
                }
                else{
                    finalResult = parseFloat(currentNumber);
                }
                previousNumber += currentNumber + " " + operatorName + " ";
                previousDisplay.innerHTML = previousNumber;
                currentDisplay.innerHTML = "";
                currentNumber = "";
                lastOperator =operatorName;
            }
        }
    });
});

function mathOperation(){
    if(lastOperator === "+"){
        finalResult = parseFloat(finalResult) + parseFloat(currentNumber);
    }
    else if(lastOperator === "-"){
        finalResult = parseFloat(finalResult) - parseFloat(currentNumber);
    }
    else if(lastOperator === "*"){
        finalResult = parseFloat(finalResult) * parseFloat(currentNumber);
    }
    else if(lastOperator === "/"){
        finalResult = parseFloat(finalResult) / parseFloat(currentNumber);
    }
}

clearAll.addEventListener("click", () => {
    currentDisplay.innerHTML = "";
    previousDisplay.innerHTML = "";
    resetAll();
});

equals.addEventListener("click", () => {
    if(!previousNumber || !currentNumber) return;
    else{
        mathOperation();
        currentNumber = finalResult;
        previousNumber = "";
        previousDisplay.innerHTML = "";
        currentDisplay.innerHTML = finalResult;
    }
});

function resetAll(){
    previousNumber = "";
    currentNumber = "";
    lastOperator = "";
    finalResult = null;
}