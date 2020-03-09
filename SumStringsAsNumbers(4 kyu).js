// Sum Strings as Numbers - www.codewars.com/kata/5324945e2ece5e1f32000370

function sumStrings(a,b) { 
  let aa = (a.length < b.length) ? b.slice(0) : a.slice(0);
  let bb = (a.length < b.length) ? a.slice(0) : b.slice(0);
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
  return result.reverse().join('').replace(/^0/i, '');
}
