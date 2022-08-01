let equation = "";
let operator = "";
const textBox = document.querySelector("#textBox");

function add(a, b) {
    /*
    let sum = 0;

    for(let num in arr) {
        sum += parseFloat(num);
    }0

    return sum; */
    return (parseFloat(a) + parseFloat(b)).toFixed(5);
}

function subtract(a, b) {
    return (parseFloat(a) - parseFloat(b)).toFixed(5);
}

function multiply(a, b) {
    return (parseFloat(a)*parseFloat(b)).toFixed(5);
}

function divide(a, b) {
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
        defualt:
            return("That is not a valid operator")     ;
    }
}

const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.id === "C") {
            textBox.textContent = "";
            equation = "";
        } else if(button.id === "=") {
            operate(equation);
        } else {
            equation += button.textContent;
            textBox.textContent += button.textContent;
        }
    })
})

function display(text) {
    textBox.textContent += text;
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
        console.log(split);
        while(split.includes("*")) {
            temp = split.indexOf("*");
            split[temp] = multiply(split[temp-1], split[temp+1]);
            split.splice(temp-1, 1);
            split.splice(temp, 1);
        }
        console.log(split);
        while(split.includes("-")) {
            temp = split.indexOf("-");
            split[temp] = subtract(split[temp-1], split[temp+1]);
            split.splice(temp-1, 1);
            split.splice(temp, 1);
        }
        console.log(split);
        while(split.includes("+")) {
            temp = split.indexOf("+");
            split[temp] = add(split[temp-1], split[temp+1]);
            split.splice(temp-1, 1);
            split.splice(temp, 1);
        }
        break;
    }

    console.log(split);
}





