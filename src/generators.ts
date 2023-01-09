/*
Module to show some reference functions and corresponding unittest about generators

*/

function* return_string(): Generator<string, string, unknown> {
  yield "hello";
  return "no result";
}

function* yield_two_strings() {
  yield "hello";
  yield "no result";
}

function* yield_three_strings_return() {
  yield "hello";
  yield "how are you";
  yield "good";
  return;
}

function* yield_two_array(): Generator<[number, number], any, unknown> {
  yield [1, 1];
  yield [2, 2];
}

export { return_string, yield_two_strings, yield_two_array, yield_three_strings_return };
