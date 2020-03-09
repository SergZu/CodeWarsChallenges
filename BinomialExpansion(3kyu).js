// Binomial Expansion - www.codewars.com/kata/540d0fdd3b6532e5c3000b5b

function expand(expr) {

  let pascal = function(n) {
	  let result = [1];
    if (n === 0) return result;
	  for (let i = 1; i < n + 1; i++) {
  	  let temp = [1];
  	  for (let m = 1; m < i; m++) {
    	  let tempElem = result[m-1] + result[m];
        temp.push(tempElem);
      }
      temp.push(1);
      result = temp;
    }
    return result
  }
  
  let regGrab = function(pattern){
	  let result = [];
	  let temp = pattern.match(/\(\-\D/i);
    if (temp !== null) result.push(-1)
    else {
    	temp = pattern.match(/\(\d+|\(\-\d+/i);
    	result.push(temp !== null ? +temp[0].replace(/\(/, '') : 1 );
      }
    temp = pattern.match(/[\+\-]\d+\)/i);
    result.push(temp !== null ? +temp[0].replace(/\)/, '') : 0);
    temp = pattern.match(/\d+$/i);
    result.push(temp !== null ? +temp [0] : 1);
    temp = pattern.match(/[a-zA-z]/i);
    result.push(temp[0]);
    return result
    }

  let [a , b , n , variable] = regGrab(expr);
  let coef = pascal(n);
  if (n == 0) return '1'
  let result = '';
  
  for (let i = 0; i < n + 1; i++) {
    let firstPart = (Math.pow(a, n - i) * coef[i] ) * Math.pow(b, i);
    if (firstPart === 0) continue;
    let signMinus = firstPart < 0;
    if (firstPart === 1 && i !== n) firstPart = ''
    else if (firstPart === -1 && i !== n) firstPart = '-';
    if (!signMinus && i !== 0) result += '+';
    if (n-i === 0) result += firstPart
    else if (n-i === 1) result += `${firstPart}${variable}`
    else result += `${firstPart}${variable}^${n-i}`;
  }
  
  return result;
  
}
