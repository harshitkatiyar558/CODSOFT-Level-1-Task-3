document.addEventListener("DOMContentLoaded", function () {
    const displayExpression = document.getElementById("expression");
    const displayResult = document.getElementById("result");
    let currentInput = "0";
    let currentOperator = "";
    let prevInput = "";
    let fullExpression = "";
  
    function updateDisplay() {
      displayExpression.textContent = fullExpression;
      displayResult.textContent = currentInput;
    }
  
    function handleDigitClick(digit) {
      if (currentInput === "0" || currentInput === "Infinity" || currentInput === "-Infinity") {
        currentInput = digit;
      } else {
        currentInput += digit;
      }
      fullExpression += digit;
      updateDisplay();
    }
  
    function handleOperatorClick(operator) {
      prevInput = currentInput;
      currentInput = "0";
      currentOperator = operator;
      fullExpression += " " + operator + " ";
      updateDisplay();
    }
  
    function handleEqualsClick() {
      const prev = parseFloat(prevInput);
      const current = parseFloat(currentInput);
  
      let result;
      switch (currentOperator) {
        case "+":
          result = prev + current;
          break;
        case "-":
          result = prev - current;
          break;
        case "*":
          result = prev * current;
          break;
        case "/":
          result = current === 0 ? "Infinity" : prev / current;
          break;
        default:
          result = current;
          break;
      }
  
      currentInput = result.toString();
      fullExpression = fullExpression + " = " + currentInput;
      currentOperator = "";
      prevInput = "";
      updateDisplay();
    }
  
    function clear() {
      currentInput = "0";
      currentOperator = "";
      prevInput = "";
      fullExpression = "";
      updateDisplay();
    }
  
    function handleSqrt() {
      currentInput = Math.sqrt(parseFloat(currentInput)).toString();
      fullExpression = `√(${currentInput})`;
      updateDisplay();
    }
  
    function handlePercent() {
      if (prevInput && currentOperator) {
        currentInput = (parseFloat(prevInput) * parseFloat(currentInput) / 100).toString();
        fullExpression += " %";
        updateDisplay();
      } else {
        currentInput = (parseFloat(currentInput) / 100).toString();
        fullExpression += " %";
        updateDisplay();
      }
    }
  
    function handleNegate() {
      currentInput = (parseFloat(currentInput) * -1).toString();
      fullExpression = `-(${currentInput})`;
      updateDisplay();
    }
  
    // Add event listeners to digit buttons
    for (let i = 0; i <= 9; i++) {
      document.getElementById(i.toString()).addEventListener("click", () => {
        handleDigitClick(i.toString());
      });
    }
  
    // Add event listeners to operator buttons
    document.getElementById("add").addEventListener("click", () => handleOperatorClick("+"));
    document.getElementById("subtract").addEventListener("click", () => handleOperatorClick("-"));
    document.getElementById("multiply").addEventListener("click", () => handleOperatorClick("*"));
    document.getElementById("divide").addEventListener("click", () => handleOperatorClick("/"));
  
    // Add event listeners to additional buttons
    document.getElementById("sqrt").addEventListener("click", handleSqrt);
    document.getElementById("percent").addEventListener("click", handlePercent);
    document.getElementById("negate").addEventListener("click", handleNegate);
  
    document.getElementById("decimal").addEventListener("click", () => {
      if (!currentInput.includes(".")) {
        currentInput += ".";
        fullExpression += ".";
        updateDisplay();
      }
    });
  
    document.getElementById("equals").addEventListener("click", handleEqualsClick);
    document.getElementById("clear").addEventListener("click", clear);
  
    document.getElementById("backspace").addEventListener("click", () => {
      if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
        fullExpression = fullExpression.slice(0, -1);
      } else {
        currentInput = "0";
        fullExpression = "";
      }
      updateDisplay();
    });
  
    // Handle keyboard input
    document.addEventListener("keydown", function (event) {
      const key = event.key;
      if (!isNaN(key) && key !== " ") {
        handleDigitClick(key);
      } else if (key === "+") {
        handleOperatorClick("+");
      } else if (key === "-") {
        handleOperatorClick("-");
      } else if (key === "*") {
        handleOperatorClick("*");
      } else if (key === "/") {
        handleOperatorClick("/");
      } else if (key === "Enter") {
        handleEqualsClick();
      } else if (key === "Escape") {
        clear();
      } else if (key === "Backspace") {
        document.getElementById("backspace").click();
      } else if (key === ".") {
        document.getElementById("decimal").click();
      }
    });
  
    updateDisplay();
  });
  