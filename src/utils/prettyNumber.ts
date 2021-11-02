export function prettyNumber(input: number) {
  let output = "";

  if (input >= 1000000) {
    output = (input / 1000000).toFixed(1) + "M";
  } else if (input >= 1000) {
    output = (input / 1000).toFixed(1) + "K";
  } else {
    output = input.toString();
  }
  return output;
}
