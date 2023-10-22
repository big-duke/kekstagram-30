/* eslint-disable no-console */
const checkStringLength = (inputString, maxLength) =>
  inputString.length <= maxLength;

console.log(checkStringLength('проверяемая строка', 20));
console.log(checkStringLength('проверяемая строка', 18));
console.log(checkStringLength('проверяемая строка', 10));

// строим строку в обратной последовательности
const isPalindrom = (inputString) => {
  const clearedString = inputString.replaceAll(' ', '').toLowerCase();
  let reversedString = '';

  for (let i = clearedString.length - 1; i >= 0; i--) {
    reversedString += clearedString[i];
  }

  return clearedString === reversedString;
};

// делим строку пополом и сравниваем зеркальные символы 1 с 5, 2 с 4 итд
const isPalindrom2 = (inputString) => {
  const clearedString = inputString.replaceAll(' ', '').toLowerCase();
  for (let i = 0; i < clearedString.length / 2; i++) {
    const leftChar = clearedString[i].toLowerCase();
    const rightChar = clearedString[clearedString.length - 1 - i].toLowerCase();
    if (leftChar !== rightChar) {
      return false;
    }
  }

  return true;
};

console.log('топот',isPalindrom('топот')); // true
// Несмотря на разный регистр, тоже палиндром
console.log('ДовОд',isPalindrom('ДовОд')); // true
// Это не палиндром
console.log('Кекс',isPalindrom('Кекс')); // false
// Это  палиндром
console.log('Лёша на полке клопа нашёл ', isPalindrom2('Лёша на полке клопа нашёл ')); // true

const extractNumbers = (inputString) => {
  const stringedInput = String(inputString);
  let res = '';
  for (const char of stringedInput) {
    const numValue = parseInt(char, 10);
    if (Number.isNaN(numValue) === false) {
      res += char;
    }
  }
  return parseInt(res, 10);
};

console.log('2023 год',extractNumbers('2023 год')); // 2023
console.log('ECMAScript 2022', extractNumbers('ECMAScript 2022')); // 2022
console.log('1 кефир, 0.5 батона', extractNumbers('1 кефир, 0.5 батона')); // 105
console.log('агент 007', extractNumbers('агент 007')); // 7
console.log('а я томат', extractNumbers('а я томат')); // NaN

console.log(2023, extractNumbers(2023)); // 2023
console.log(-1, extractNumbers(-1)); // 1
console.log(1.5, extractNumbers(1.5)); // 15
