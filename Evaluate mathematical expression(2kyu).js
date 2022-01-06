/* Instructions
Given a mathematical expression as a string you must return the result as a number.

Numbers
Number may be both whole numbers and/or decimal numbers. The same goes for the returned result.

Operators
You need to support the following mathematical operators:

Multiplication *
Division / (as floating point division)
Addition +
Subtraction -
Operators are always evaluated from left-to-right, and * and / must be evaluated before + and -.

Parentheses
You need to support multiple levels of nested parentheses, ex. (2 / (2 + 3.33) * 4) - -6

Whitespace
There may or may not be whitespace between numbers and operators.

An addition to this rule is that the minus sign (-) used for negating numbers and parentheses will never be separated by whitespace. I.e all of the following are valid expressions.

1-1    // 0
1 -1   // 0
1- 1   // 0
1 - 1  // 0
1- -1  // 2
1 - -1 // 2
1--1   // 2

6 + -(4)   // 2
6 + -( -4) // 10
And the following are invalid expressions

1 - - 1    // Invalid
1- - 1     // Invalid
6 + - (4)  // Invalid
6 + -(- 4) // Invalid
Validation
You do not need to worry about validation - you will only receive valid mathematical expressions following the above rules.

Restricted APIs
NOTE: Both eval and Function are disabled. */

 const calc = function (expression) {
  // evaluate `expression` and return result
  const operation = {
    '+' : { pred: 1, func: (a, b) => { return Number(a) + Number(b) } },
    '-' : { pred: 1, func: (a, b) => { return Number(a) - Number(b) } },
    '*' : { pred: 2, func: (a, b) => { return Number(a) * Number(b) } },
    '/' : { pred: 2, func: (a, b) => { return Number(a) / Number(b) } },
    '!' : { pred: 3, func: (a) => { return -1 * Number(a) } } 
    }
  
  
  const digits =  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
  const operators = ['-', '+', '*', '/'];
  
  const tokenQueue = [];
  const operatorsStack = [];
  const numberStack = [];
  
  let currentValue = '';
  const trimExpression = expression.replace(/\s/g, '');
  for (let i = 0; i < trimExpression.length; i++) { // Convert expression to postfix notation string
    let sym = trimExpression[i];
    if (digits.includes(sym)) { // Check for number
      currentValue += sym;
      
      if (i === trimExpression.length - 1) tokenQueue.push(currentValue);
      continue
    } else { 
      if (currentValue.length > 0) tokenQueue.push(currentValue); // Clear number variable
      currentValue = ''
    }
    
    if ( sym === '(' ) { // * Compute brackets
      operatorsStack.push(sym);
      continue
      }
     if ( sym === ')' ) {  
      let temp = operatorsStack.pop();
     while ( temp !== '(' ) {
        tokenQueue.push(temp);
        temp = operatorsStack.pop();
      }
      continue
   }
    
    if ( ( sym === '-') && 
      ( i === 0 ||
      ( digits.includes(trimExpression[i + 1]) || trimExpression[i + 1] === '(' || trimExpression[i + 1] === '-' ) &&
      (operators.includes(trimExpression[i - 1]) || trimExpression[i - 1] === '(')
      ) ) { // Check if operator is unary minus
          operatorsStack.push( operation['!'] );
          continue
    }
    
    const operator = operation[sym];
      if ( !operatorsStack.length ) {
        operatorsStack.push(operator);
        continue
      }
      if (operatorsStack[operatorsStack.length - 1] === '(' || operator.pred > operatorsStack[operatorsStack.length - 1].pred ) {
        operatorsStack.push(operator);
        continue
      }
    let topStack = operatorsStack[operatorsStack.length - 1];
    while ( topStack !== '(' && topStack !== undefined && topStack.pred >= operator.pred ) {
      tokenQueue.push( operatorsStack.pop() );
      topStack = operatorsStack[operatorsStack.length - 1];
    }
    operatorsStack.push(operator);
  }
  while ( operatorsStack.length ) {
    tokenQueue.push( operatorsStack.pop() )
  }
  
  
 while (tokenQueue.length) { // Evaluate posfix expression
    let token = tokenQueue.shift();
    
    if (!Number.isNaN( Number(token) )) {
      numberStack.push(token);
      continue
    }
    
    let func = token.func
      let numB = token.pred === 3 ? null : numberStack.pop();
      let numA = numberStack.pop() ;
      const value = func(numA, numB);
    
    numberStack.push(value)
    
  }
  
 
  return Number(numberStack.valueOf())
};

const tests = [
  ['1+1', 2],
  ['1 - 1', 0],
  ['1* 1', 1],
  ['1 /1', 1],
  ['-123', -123],
  ['123', 123],
  ['2 /2+3 * 4.75- -6', 21.25],
  ['12* 123', 1476],
  ['2 / (2 + 3) * 4.33 - -6', 7.732],
  ['6 + -( -4)', 10],
  ['6 + -(4)', 2],
  ['12* 123/-(-5 + 2)', 492],
  ['12* 123/(-5 + 2)', -492],
  ['(123.45*(678.90 / (-2.5+ 11.5)-(((80 -(19))) *33.25)) / 20) - (123.45*(678.90 / (-2.5+ 11.5)-(((80 -(19))) *33.25)) / 20) + (13 - 2)/ -(-11)', 1],
  ['((2.33 / (2.9+3.5)*4) - -6)', 7.45625],
  ['123.45*(678.90 / (-2.5+ 11.5)-(80 -19) *33.25) / 20 + 11', -12042.760875],
  ['1- -1', 2],
  ['1 - -1', 2],
  ['1--(--1)', 2],
];

tests.forEach(function (m) {
  console.log(`${m[0]} = ${m[1]} - ${calc(m[0]) === m[1]}`);
});
