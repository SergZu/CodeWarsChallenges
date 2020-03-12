// Prime Streaming (3kyu) - www.codewars.com/kata/5519a584a73e70fa570005f5

class Primes {
  static *stream() {
    let primeList = [];
    let currentNumber = 2;
    yield currentNumber++; 
    
    while (true) { 
      if ( isPrimeNumber(currentNumber, primeList) ) {
    primeList.push(currentNumber)
    yield currentNumber
    }
    currentNumber += 2      
    }
  }
}

const isPrimeNumber = (numberToCheck, primeList) => {
	for (let j of primeList) {
    if (numberToCheck % j === 0) return false;
    if (j > Math.sqrt(numberToCheck)) return true
  }
  return true;
};
