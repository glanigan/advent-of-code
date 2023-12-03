import fs from "node:fs";

type Day =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25;

type Years = 2023;

export function getInput(year: Years, day: Day, sample?: boolean) {
  const inputFile =
    (process.env.SAMPLE = true ? "input.sample.txt" : "input.txt") || sample;

  return fs
    .readFileSync(`src/${year}/day-${day}/${inputFile}`, "utf8")
    .trim()
    .split(/\n/g);
}
