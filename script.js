function add(firstNumber, secondNumber) {
    return firstNumber + secondNumber;
};

function subtract(firstNumber, secondNumber) {
    return firstNumber - secondNumber;
};

function multiply(firstNumber, secondNumber) {
    return firstNumber * secondNumber;
};

function divide(firstNumber, secondNumber) {
    if (secondNumber === 0) {
        console.log('you cant divide with 0');
        return 0
    } else {
        return firstNumber / secondNumber;

    }
};

function operation(firstNumber, secondNumber, operator) {
    switch (operator) {
        case 'x':
            return multiply(firstNumber, secondNumber);
        case '+':
            return add(firstNumber, secondNumber);
        case '-':
            return subtract(firstNumber, secondNumber);
        case '%':
            return divide(firstNumber, secondNumber);
    }
};





let numbers = document.querySelectorAll('.numberBtn')
let dotCheck = false;
let operationInfo = {};
let output = document.querySelector('.outputResult')
let outputText = document.querySelector('.outputText')
numbers.forEach(number => {
    number.addEventListener('click', () => {
        if (!(operationInfo['operator'])) {
            if (!(operationInfo[`num1`])) {
                operationInfo[`num1`] = number.textContent;
                output.textContent = operationInfo[`num1`]
            } else {
                if (operationInfo['finish']) {
                    operationInfo[`num1`] = number.textContent;
                    output.textContent = operationInfo[`num1`];
                    delete operationInfo['finish'];
                } else {
                    operationInfo[`num1`] += number.textContent;
                    output.textContent = operationInfo[`num1`]
                }


            }

        } else {
            if (!(operationInfo[`num2`])) {
                operationInfo[`num2`] = number.textContent;
                output.textContent = operationInfo[`num1`] + operationInfo[`operator`] + operationInfo[`num2`]
            } else {
                operationInfo[`num2`] += number.textContent;
                output.textContent = operationInfo[`num1`] + operationInfo[`operator`] + operationInfo[`num2`]
            }
        }

        console.log(operationInfo);
    })
})

let operators = document.querySelectorAll('.operatorBtn')
operators.forEach(operator => {
    operator.addEventListener('click', () => {
        if ((operationInfo[`num1`]) && !(operationInfo[`num2`])) {
            operationInfo['operator'] = operator.innerHTML
            output.textContent = operationInfo[`num1`] + operationInfo[`operator`]
            dotCheck = false
            delete operationInfo['finish'];

        } else if ((operationInfo[`num1`]) && (operationInfo[`num2`])) {
            let result = operation(+operationInfo['num1'], +operationInfo['num2'], operationInfo['operator'])
            console.log(result);
            outputText.textContent = operationInfo[`num1`] + operationInfo[`operator`] + operationInfo[`num2`]
            operationInfo[`num1`] = result;
            operationInfo['operator'] = operator.innerHTML;
            delete operationInfo['num2'];
            output.textContent = result
            dotCheck = false

        }
        console.log(operationInfo);
    })
})

let equal = document.querySelector('.equal')
equal.addEventListener('click', () => {
    if (operationInfo[`num1`] && operationInfo['num2'] && operationInfo['operator']) {
        let result = operation(+operationInfo['num1'], +operationInfo['num2'], operationInfo['operator']);
        operationInfo['finish'] = true;
        outputText.textContent = operationInfo[`num1`] + operationInfo[`operator`] + operationInfo[`num2`]
        output.textContent = result;
        operationInfo['num1'] = result;
        delete operationInfo['num2'];
        delete operationInfo['operator'];
        console.log(result);
    }
})

let clear = document.querySelector('.clear')
clear.addEventListener('click', () => {
    operationInfo = {}
    output.textContent = 0
    outputText.textContent = ''
})

let change = document.querySelector('.change')
change.addEventListener('click', () => {
    if ((operationInfo[`num1`]) && !(operationInfo[`num2`])) {
        if (operationInfo[`num1`] > 0) {
            operationInfo[`num1`] = -operationInfo[`num1`]
            output.textContent = operationInfo[`num1`]
            console.log(operationInfo)
        } else {
            operationInfo[`num1`] = operationInfo[`num1`] * -1
            output.textContent = operationInfo[`num1`]
            console.log(operationInfo)
        }
    } else if ((operationInfo[`num1`]) && (operationInfo[`num2`])) {
        if (operationInfo[`num2`] > 0) {
            operationInfo[`num2`] = -operationInfo[`num2`]
            output.textContent = operationInfo[`num1`] + operationInfo[`operator`] + operationInfo[`num2`]
            console.log(operationInfo)
        } else {
            operationInfo[`num2`] = operationInfo[`num2`] * -1
            output.textContent = operationInfo[`num1`] + operationInfo[`operator`] + operationInfo[`num2`]
            console.log(operationInfo)
        }
    }
})

let dot = document.querySelector('.dot')
dot.addEventListener('click', () => {
    if (!(operationInfo['operator'])) {
        if (!dotCheck) {
            operationInfo[`num1`] += dot.textContent;
            output.textContent = operationInfo[`num1`]
            dotCheck = true
        }
    } else {
        if (!dotCheck) {
            operationInfo[`num2`] += dot.textContent;
            output.textContent = operationInfo[`num1`] + operationInfo[`operator`] + operationInfo[`num2`]
            dotCheck = true
        }
    }
})

let shift = document.querySelector('.shift')
shift.addEventListener('click', () => {
    if (!(operationInfo['operator'])) {
        if (operationInfo[`num1`]) {
            if (!(operationInfo['finish'])) {
                let newNumber = operationInfo[`num1`].slice(0, -1)//second parameter is not included in the output
                if (newNumber !== '') {
                    operationInfo[`num1`] = newNumber
                    output.textContent = operationInfo[`num1`]
                } else {
                    operationInfo[`num1`] = 0
                    output.textContent = operationInfo[`num1`]
                }
            }
        }

    } else {
        if ((operationInfo[`num2`])) {
            let newNumber = operationInfo[`num2`].slice(0, -1)//second parameter is not included in the output
            if (newNumber !== '') {
                operationInfo[`num2`] = newNumber
                output.textContent = operationInfo[`num1`] + operationInfo[`operator`] + operationInfo[`num2`]
            } else {
                operationInfo[`num2`] = 0
                output.textContent = operationInfo[`num1`] + operationInfo[`operator`] + operationInfo[`num2`]
            }

        }
    }

})