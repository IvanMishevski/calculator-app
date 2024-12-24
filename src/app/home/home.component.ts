import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  displayValue: string = '0';

  handleOperator(operator: string) {
    if (operator === '(' || operator === ')') {
      if (this.displayValue === '0' && operator === '(') {
        this.displayValue = '(';
      } else {
        this.displayValue += operator;
      }
    } else {
      this.displayValue += ' ' + operator + ' ';
    }
  }
  appendNumber(number: string) {
    if (this.displayValue === '0') {
      this.displayValue = number;
    } else {
      this.displayValue += number;
    }
  }
  appendDecimal() {
    // Get the current number being entered by splitting on operators and taking the last part
    const parts = this.displayValue.split(/[+\-x\/%]/);
    const currentNumber = parts[parts.length - 1].trim();
    
    if (!currentNumber.includes('.')) {
      this.displayValue += '.';
    }
  }
  backspace() {
    this.displayValue = this.displayValue.slice(0, -1);
    if (this.displayValue === '') {
      this.displayValue = '0';
    }
  }
  calculate() {
    try {
      const expression = this.displayValue.replace(/x/g, '*');
      this.displayValue = new Function('return ' + expression)().toString();
    } catch (error) {
      this.displayValue = 'Error';
    }
  }
  clear() {
   this.displayValue = '0';
  }
}
