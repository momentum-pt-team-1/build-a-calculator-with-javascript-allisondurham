


class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
    
    
    clear() {
        this.currentOperand = ""
        this.previousOperand = ""
        this.operation = undefined
    }
    
    backspace() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    
    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) return;
        if (number === "-" && this.currentOperand.includes("-")) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();

        }
    
    chooseOperation(operation) {
        if (this.currentOperand === "") return;
        if (this.previousOperand !== "") {
            this.compute();
            }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }
    
    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return;
        switch(this.operation) {
            case "+":
                computation = prev + current;
                break;
            case "-":
                computation = prev - current;
                break;
            case "×":
                computation = prev * current;
                break;
            case "÷":
                computation = prev / current;
                break;
            case "%":
                computation = parseInt(prev) % parseInt(current);
                break;
            case "^":
                computation = prev ** current;
                break;
            case "√":
                if (prev < 0) {
                    this.currentOperandTextElement.innerText = "ERR: imaginary number"
                    this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation} ${this.currentOperand}`;
                    break;
                } else {
                    computation = prev ** (1/current);
                    break;
                }
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined
        this.previousOperand = ""
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split(".")[0])
        const decimalDigits = stringNumber.split(".")[1]
        let integerDisplay
        if (stringNumber === "-") {
            integerDisplay = "-"
            return integerDisplay
    
        }
        if(isNaN(integerDigits)) {
        integerDisplay = ""
        } else {
        integerDisplay = integerDigits.toLocaleString("en", {
            maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
        } else {
        return integerDisplay
        }
    }
    
    updateDisplay() {
        if (this.currentOperandTextElement.innerText === "ERR: imaginary number") {
            return;
        }
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
            } else {
                this.previousOperandTextElement.innerText = ""
            }
        }
    }
    
    
    
    
document.addEventListener('DOMContentLoaded', (event) => {
    
    const numberButtons = document.querySelectorAll('[data-number]');
    const operationButtons = document.querySelectorAll('[data-operation]');
    const equalsButton = document.querySelector('[data-equals]');
    const allClearButton = document.querySelector('[data-all-clear]');
    const backspaceButton = document.querySelector('[data-backspace]');
    const previousOperandTextElement = document.querySelector('[data-previous-operand]');
    const currentOperandTextElement = document.querySelector('[data-current-operand]');
    const piButton = document.querySelector('[data-pi]');
    const negativeButton = document.querySelector('[data-negative]')

    

    
    const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);


    for (let button of numberButtons) {
        button.addEventListener("click", () => {
            calculator.appendNumber(button.innerText)
            calculator.updateDisplay()
    })
    }

    for (let button of operationButtons) {
        button.addEventListener("click", () => {
            calculator.chooseOperation(button.innerText)
            calculator.updateDisplay()
            })
        }

    negativeButton.addEventListener("click", button => {
        if (calculator.currentOperandTextElement.innerText !== "") {
            calculator.currentOperandTextElement.innerText = calculator.currentOperand * -1
        } 
        if (calculator.currentOperand !== "") {
            calculator.currentOperand = calculator.currentOperand * -1
        }
        else {
            calculator.appendNumber("-")
            calculator.updateDisplay()
        }
    })

    piButton.addEventListener("click", button => {
        if (calculator.currentOperand === "") {
            calculator.appendNumber(3.14159265)
            calculator.updateDisplay()
        } else {
            return;
        }
    })

    equalsButton.addEventListener("click", button => {
        calculator.compute()
        calculator.updateDisplay()
    })

    allClearButton.addEventListener("click", button => {
        calculator.clear()
        calculator.updateDisplay()
    })

    backspaceButton.addEventListener("click", button => {
        calculator.backspace()
        calculator.updateDisplay()
    })

})