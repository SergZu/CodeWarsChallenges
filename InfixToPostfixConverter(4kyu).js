// Infix to Postfix Converter - www.codewars.com/kata/52e864d1ffb6ac25db00017f

function toPostfix (infix) {
  // Convert infix to postfix here, and return result.
 let ops = {'+': 1, '-': 1, '*': 2, '/': 2, '^': 3};
  let peek = (a) => a[a.length - 1];
  let stack = [];

  return infix
    .split('')
    .reduce((output, token) => {
      if (parseFloat(token) || token === '0') {
        output.push(token);
      }

      if (token in ops) {
        while (peek(stack) in ops && ops[token] <= ops[peek(stack)])
          output.push(stack.pop());
        stack.push(token);
      }

      if (token == '(') {
        stack.push(token);
      }

      if (token == ')') {
        while (peek(stack) != '(')
          output.push(stack.pop());
        stack.pop();
      }

      return output;
    }, [])
    .concat(stack.reverse())
    .join('');
}
