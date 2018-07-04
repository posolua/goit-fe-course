'use strict';
let userInput;
const numbers = [];
const nan = 'Было введено не число, попробуйте еще раз';

do {
 userInput = prompt('Введите число');
 if (Number.isNaN(Number(userInput))) {
   alert(nan);
 } else if (userInput !== null) {
   numbers.push(Number(userInput));
 }
} while (userInput !== null && !Number.isNaN(userInput));

console.log(numbers);

let total = 0;

for (let value of numbers) {
 total += value;
}

const ARRAY_SUM = `Общая сумма чисел равна ${total}`;
if (total !== 0) {
 alert(ARRAY_SUM);
}