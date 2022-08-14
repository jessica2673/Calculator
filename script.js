let equation = "";
let operator = "";
let result = "";
let disable = false;
let needClear = false;
const textBox = document.querySelector("#textBox");

function add(a, b) {
    return (parseFloat(a) + parseFloat(b)).toFixed(5);
}

function subtract(a, b) {
    return (parseFloat(a) - parseFloat(b)).toFixed(5);
}

function multiply(a, b) {
    return (parseFloat(a)*parseFloat(b)).toFixed(5);
}

function divide(a, b) {
    if(parseFloat(b) === 0) {
        clear();
        needClear = true;
        return "You know that results in undefined right?";
    }
    return (parseFloat(a)/parseFloat(b)).toFixed(5);
}

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            add(a, b);
            break;
        case "-":
            subtract(a, b);
            break;
        case "*":
            multiply(a, b);
            break;
        case "/":
            divide(a, b);
            break;   
        default:
            return("That is not a valid operator");
    }
}

const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if(needClear) {
            clear();
            needClear = false;
        }
        if (button.id === "C") {
            clear();
        } else if(button.id === "=") {
            operate(equation);
        } else if (button.id === ".") {
            if(!disable) {
                equation += button.textContent;
                textBox.textContent += button.textContent;
            }
            ".".disabled = true;
            disable = true;
        }  else if (button.id === "neg") {
            equation += "-1*";
            textBox.textContent += "-";
        }
        else if(button.id === "D") {
            if(equation.length > 0) {
                equation = equation.slice(0, equation.length-1);
                textBox.textContent = equation;
            }
        }
        else {
            if (button.id === "*" || button.id === "/" || button.id === "+" || button.id === "-") {
                disable = false;
            }
            equation += button.textContent;
            textBox.textContent += button.textContent;
        }
    })
})

function clear() {
    textBox.textContent = "";
    equation = "";
    disable = false;
}

function display(text) {
    if(text == "NaN") {
        textBox.textContent = "That is not a valid operation";
        needClear = true;
    } else {
        textBox.textContent = text;
    }
    equation = text;
    disable = true;
}

function operate(equation) {
    let split = equation.replaceAll('+', ' + ').replaceAll('-', ' - ').replaceAll('*', ' * ').replaceAll('/', ' / ').split(' ');
    let temp;
    while(split.length > 1) {
        while(split.includes("/")) {
            temp = split.indexOf("/");
            split[temp] = divide(split[temp-1], split[temp+1]);
            split.splice(temp-1, 1);
            split.splice(temp, 1);
        }
        while(split.includes("*")) {
            temp = split.indexOf("*");
            split[temp] = multiply(split[temp-1], split[temp+1]);
            split.splice(temp-1, 1);
            split.splice(temp, 1);
        }
        while(split.includes("-")) {
            temp = split.indexOf("-");
            split[temp] = subtract(split[temp-1], split[temp+1]);
            split.splice(temp-1, 1);
            split.splice(temp, 1);
        }
        while(split.includes("+")) {
            temp = split.indexOf("+");
            split[temp] = add(split[temp-1], split[temp+1]);
            split.splice(temp-1, 1);
            split.splice(temp, 1);
        }
        console.log(split);
        display(split);
        break;
    }

    console.log(split);
}
