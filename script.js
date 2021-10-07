"use strict";

const numberButtons = document.querySelectorAll("[data-type='number']");
const deleteButton = document.querySelector("[data-type='delete']");
const resetButton = document.querySelector("[data-type='reset']");
const equalButton = document.querySelector("[data-type='equal']");
const operationButtons = document.querySelectorAll("[data-type='operation']");
const previousEl = document.querySelector("[data-type='previous']");
const currentEl = document.querySelector("[data-type='current']");

class Calculator {
  constructor(currentEl, previousEl) {
    this.currentEl = currentEl;
    this.previousEl = previousEl;

    this.clear();
  }

  clear() {
    this.current = "";
    this.previous = "";
    this.operation = undefined;
  }

  appendNumber(number) {
    if (number === "." && this.current.toString().includes(".")) return;
    this.current = this.current.toString() + number.toString();
  }

  selectOperation(operation) {
    if (this.current === "") return;
    if (this.previous !== "") {
      this.compute();
    }
    this.previous = this.current;
    this.current = "";
    this.operation = operation;
  }

  compute() {
    if (!this.current || !this.previous || !this.operation) return;
    let computation;
    const curr = parseFloat(this.current);
    const prev = parseFloat(this.previous);
    switch (this.operation) {
      case "+":
        computation = curr + prev;
        break;
      case "-":
        computation = prev - curr;
        break;
      case "x":
        computation = prev * curr;
        break;
      case "/":
        computation = prev / curr;
        break;
    }
    this.current = computation;
    this.previous = "";
    this.operation = undefined;
    this.updateDisplay();
  }

  delete() {
    this.current = this.current.toString().slice(0, -1);
  }

  updateDisplay() {
    this.currentEl.innerText = this.formatNumber(this.current);
    if (this.previous !== "" && this.operation !== undefined) {
      this.previousEl.innerText =
        this.formatNumber(this.previous) + this.operation;
    } else {
      this.previousEl.innerText = this.previous;
    }
  }

  formatNumber(number) {
    if (number === "") return "";
    if (number.toString().includes(".")) {
      const [integerDigits, decimalDigits] = number.toString().split(".");
      return (
        Number(integerDigits).toLocaleString(undefined) + "." + decimalDigits
      );
    } else {
      return Number(number).toLocaleString(undefined);
    }
  }
}

const myCalculator = new Calculator(currentEl, previousEl);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    myCalculator.appendNumber(button.innerText);
    myCalculator.updateDisplay();
  });
});

resetButton.addEventListener("click", () => {
  myCalculator.clear();
  myCalculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  myCalculator.delete();
  myCalculator.updateDisplay();
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    myCalculator.selectOperation(button.innerText);
    myCalculator.updateDisplay();
  });
});

equalButton.addEventListener("click", () => {
  myCalculator.compute();
  myCalculator.updateDisplay();
});

(function () {
  const favoriteTheme = localStorage.getItem("theme");
  if (favoriteTheme) {
    const options = document.querySelectorAll('[type="radio"]');
    document.body.className = `${favoriteTheme}`;
    const currentBtn = [...options].filter(
      (option) => option.value === favoriteTheme
    );
    currentBtn[0].checked = true;
  } else {
    document.querySelector('[type="radio"]').checked = true;
    document.body.className = "theme1";
  }
})();

//THEMES
const themeToggle = document.querySelector("form");
themeToggle.addEventListener("change", (e) => {
  e.preventDefault();
  const currentTheme = e.target.value;
  document.body.className = `${currentTheme}`;
  localStorage.setItem("theme", currentTheme);
});
