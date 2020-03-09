// Getting along with Integers - www.codewars.com/kata/55cf3b567fc0e02b0b00000b

function* partF(n) {
    "use strict";

    if (n <= 0) throw new Error('positive integer only');
    yield [n];

    var x = new Array(n);
    x[0] = n;
    for (var i = 1; i < n; i++) x[i] = 1;

    var m = 0, h = 0, r, t;
    while (x[0] != 1) {
        if (x[h] == 2) {
            m += 1;
            x[h] = 1;
            h -= 1;
        } else {
            r = x[h] - 1;
            x[h] = r;

            t = m - h + 1;
            while (t >= r) {
                h += 1;
                x[h] = r;
                t -= r;
            }
            m = h + (t !== 0 ? 1 : 0);
            if (t > 1) {
                h += 1;
                x[h] = t;
            }
        }
        yield x.slice(0, m + 1);
    }
}

let result = [];
function part(n){
  let result = [];
  for (var arr of partF(n)) {
    result.push(arr);
  }
  let prod = [];
      let tempSet = new Set();
      result.forEach(
        (item)=>{ tempSet.add( item.reduce( (mult, current) => mult * current ) )}
    );
    tempSet.forEach( (item) => prod.push(item) );
    prod = prod.sort((a,b) => a-b);
    let range = prod[prod.length - 1] - prod[0];
    let average = prod.reduce( (sum, current) => sum + current) / prod.length;
    let median;
    let middleNum = prod.length / 2;
    if (prod.length % 2 == 0) {
      median = (prod[middleNum-1] + prod[middleNum]) / 2;
    }
    else median = prod[Math.floor(middleNum)];
    average = average.toFixed(2);
    median = median.toFixed(2);
    return `Range: ${range} Average: ${average} Median: ${median}`
}
