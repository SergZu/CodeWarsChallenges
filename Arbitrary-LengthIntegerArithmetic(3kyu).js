// Arbitrary-length Integer Arithmetic - www.codewars.com/kata/530e69ae72d6dfced0000a9e

function compare(a, b){
	let arg1 = `${a}`;
  arg1 = arg1 === `0` ? `0` : arg1.replace(/^0+/i, '');
  let arg2 = `${b}`;
  arg2 = arg2 === `0` ? `0` : arg2.replace(/^0+/i, '');
  if (arg1.length !== arg2.length) return (arg1.length >= arg2.length)
	for (let i = 0; i < arg1.length; i++){
  	if (arg1[i] !== arg2[i]) return (arg1[i] > arg2[i])
  }
  return true
}

function add(augend, addend) { 
  let aa = (augend.length < addend.length) ? addend.slice(0) : augend.slice(0);
  let bb = (augend.length < addend.length) ? augend.slice(0) : addend.slice(0);
  let arrA = aa.split('').reverse();
  let arrB = bb.split('').reverse();
  let stack = [];
  let result = [];
  for (let i = 0; i < arrA.length; i++) 
  stack[i] = (i < arrB.length) ? +arrA[i] + +arrB[i] : +arrA[i];
  for (let j = 0; j < stack.length; j++) {
    let num = stack[j] % 10;
    let move = Math.floor(stack[j] / 10);
    result.push(num);
    if (move > 0 && j == stack.length - 1) result.push(move)
      else if (move > 0) stack[j+1] += move 
  }  
  result = result.reverse().join('').replace(/^0/i, '');
  return result == '' ? `0` : result
}

function subtract(minuend, subtrahend) {
  // Rewrite this to support at least 100 digits
  let min = ( compare(minuend, subtrahend) ) ? minuend.slice(0) : subtrahend.slice(0);
  let sub = min === minuend ? subtrahend.slice(0) : minuend.slice(0);
  let arrA = min.split('').reverse();
  let arrB = sub.split('').reverse();
  let stack = []
  let result = [];
  for (let i = 0; i < arrA.length; i++) 
  stack[i] = (i < arrB.length) ? arrA[i] - arrB[i] : +arrA[i];
  for (let j = 0; j < stack.length; j++) {
    if (stack[j] < 0) {
    let num = 10 + stack[j];
    stack[j+1] -= 1;
    result.push(num);
    }
    else {
    	let num = stack[j];
      result.push(num);
    }
  }
  result = min == minuend ? `${result.reverse().join('').replace(/^0+/i, '')}` : `-${result.reverse().join('').replace(/^0+/i, '')}`;
  return result == '' ? '0' : result
}

function multiply(multiplicand, multiplier) {
  let temp = [], result = '';
  let arrA = multiplicand.split('').reverse(), arrB = multiplier.split('').reverse();
  for (let i = 0; i < arrA.length; i++ ) {
    for (let j = 0; j < arrB.length; j++ ) {
      let current = arrA[i] * arrB[j];
      temp[i+j] = (temp[i + j]) ? temp[i + j] + current : current;
    }
  }
  for (let i = 0; i < temp.length; i++) {
    let num = temp[i] % 10;
    let move = Math.floor(temp[i] / 10);
    temp[i] = num;

    if (temp[i + 1])
      temp[i + 1] += move;
    else if (move != 0)
      temp[i + 1] = move;
  }
  
  temp.reverse();
  while (temp[0] == '0') {
    temp = temp.slice(1);
  }
  return (temp.length) ? temp.join('') : '0'
}

function divide(dividend, divisor) {
  // Rewrite this to support at least 100 digits
  let result = `0`;
	if ( !compare(dividend, divisor) ) return result
  	else {
    	let temp =``;
      for (let i = 0; i < dividend.length; i++) {
      	temp+=dividend[i];
        let tempResult = 0; 
        while (compare(temp, divisor) ) {
        	temp = subtract(temp, divisor);
          tempResult++;
        }
        result+=`${tempResult}`
      }
    }
    return result.replace(/^0+/i, '')
}
