// Multiplying Numbers as String - www.codewars.com/kata/55911ef14065454c75000062

function multiply(a, b)
{
  let temp = [], result = '';
  let arrA = a.split('').reverse(), arrB = b.split('').reverse();
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
