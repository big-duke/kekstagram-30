/* eslint-disable no-unused-vars */
const checkStringLength = (inputString, maxLength) =>
  inputString.length <= maxLength;

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

const getZippedArrays = (arrKeys, arrValues) =>
  arrKeys.reduce((acc, key, index) => {
    acc[key] = arrValues[index];
    return acc;
  }, {});

const getRepeats = (inputArray) =>
  inputArray.reduce((acc, cur) => {
    if (cur in acc) {
      acc[cur] += 1;
    } else {
      acc[cur] = 1;
    }
    return acc;
  }, {});

const convertTimeToMinutes = (time) => {
  const [hour, minutes] = time.split(':');
  return Number(hour) * 60 + Number(minutes);
};

const checkMeeting = (
  workdayStart,
  workdayEnd,
  meetingStart,
  meetingDuration
) => {
  const workdayStartMinutes = convertTimeToMinutes(workdayStart);
  const workdayEndMinutes = convertTimeToMinutes(workdayEnd);
  const meetingStartMinutes = convertTimeToMinutes(meetingStart);

  return (
    meetingStartMinutes >= workdayStartMinutes &&
    meetingStartMinutes + meetingDuration <= workdayEndMinutes
  );
};

