import { getInput } from "../../lib/getInput";

const input = getInput(2023, 1) ?? [];

// // Part 1
const result = input.reduce((total, current) => {
  const lineOfNumbers = current.split("").filter((v) => !!parseInt(v));
  const first = lineOfNumbers[0];
  const last = lineOfNumbers[lineOfNumbers.length - 1];

  // // Need to fix my parser
  if (!first && !last) return total;
  return total + parseInt(`${first}${last}`);
}, 0);

console.log(`Part 1 result: ${result}`);

//Part 2
const mapStringToNumber = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
} as const;

type NumberKeys = keyof typeof mapStringToNumber;
const numbersAsText = Object.keys(mapStringToNumber) as NumberKeys[];

const resultpart2 = input?.reduce((total, line) => {
  let first, last;
  let word = "";

  if (!line) return total;

  for (const char of line) {
    if (parseInt(char)) {
      first = char;
      break;
    }
    word += char;
    const key = numbersAsText.find((n) => word.endsWith(n));
    if (key) {
      first = mapStringToNumber[key];
      break;
    }
  }
  word = "";

  for (const char of line.split("").reverse()) {
    if (parseInt(char)) {
      last = char;
      break;
    }
    word = char + word;

    const key = numbersAsText.find((n) => word.startsWith(n));
    if (key) {
      last = mapStringToNumber[key];
      break;
    }
  }
  if (!first && !last) return total;
  return total + parseInt(`${first}${last}`);
}, 0);

console.log(`Part 2 result: ${resultpart2}`);
