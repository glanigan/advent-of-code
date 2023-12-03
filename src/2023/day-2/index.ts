import { getInput } from "../../lib/getInput";

const input = getInput(2023, 2) ?? [];

const configuration = {
  red: 12,
  green: 13,
  blue: 14,
};

let total = 0;

for (const line of input) {
  const index = line.indexOf(":");
  const game = parseInt(line.substring(0, index).replace("Game ", ""));

  const plays = line.substring(index + 1).split(";");

  const isPossible = plays.every((play) => {
    const types = play.split(",");

    return types.every((type) => {
      if (type.endsWith("red")) {
        if (parseInt(type.replace(" red", "")) > configuration.red) {
          return false;
        }
      } else if (type.endsWith("green")) {
        if (parseInt(type.replace(" green", "")) > configuration.green) {
          return false;
        }
      } else if (type.endsWith("blue")) {
        if (parseInt(type.replace(" blue", "")) > configuration.blue) {
          return false;
        }
      }
      return true;
    });
  });

  if (isPossible) {
    total += game;
  }
}

console.log(total);

//Part 2

total = 0;

for (const line of input) {
  const index = line.indexOf(":");

  const plays = line.substring(index + 1).split(";");
  const mins = { red: 0, green: 0, blue: 0 };
  plays.forEach((play) => {
    const types = play.split(",");

    types.forEach((type) => {
      if (type.endsWith("red")) {
        const num = parseInt(type.replace(" red", ""));
        if (num > mins.red) {
          mins.red = num;
        }
      }
      if (type.endsWith("green")) {
        const num = parseInt(type.replace(" green", ""));
        if (num > mins.green) {
          mins.green = num;
        }
      }
      if (type.endsWith("blue")) {
        const num = parseInt(type.replace(" blue", ""));
        if (num > mins.blue) {
          mins.blue = num;
        }
      }
    });
  });

  total += mins.red * mins.green * mins.blue;
}

console.log(total);
