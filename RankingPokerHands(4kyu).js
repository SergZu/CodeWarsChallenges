// Ranking Poker Hands - www.codewars.com/kata/5739174624fc28e188000465

var Result = { "win": 1, "loss": 2, "tie": 3 }

function PokerHand(hand) {
  this.cards = hand;
}

PokerHand.prototype.compareWith = function(hand){
    let player1 = this;
    let player2 = hand;
    let result = [ '', 'win', 'loss', 'tie']
    
    let analizeHand = function(hand) {
    let temp = hand.cards.split(' ');
    let value = hand.cards.replace(/T/g, '10').replace(/J/g, '11').replace(/Q/g, '12').replace(/K/g, '13').replace(/A/g, '14');
    value = value.split(/\w\s/g);
    value[value.length - 1] = value[value.length - 1].length == 3 ? value[value.length - 1][0] + value[value.length - 1][1] : value[value.length - 1][0];
    value.sort( (a,b) => b - a )
    let suit = hand.cards[1];
    let searchStraight = function(){
      let tempValueArr = [...value];
      let result = true;
      for (let i = 1; i < tempValueArr.length; i++) {
        if (+tempValueArr[i] !== +tempValueArr[i - 1] - 1) result = false
      }
      return result;
    };
    
    let hasOneSuit = function(){
      let result = temp.every( (item) => item[1] === suit);
      return result;
    };
    
    let searchEqual = function(){
      let tempSet = new Set();
      for (let i = 0; i < value.length; i++) {
        tempSet.add(value[i]);
      } 
      let size = tempSet.size;
      let result = [];
      if (size === 5) return result
      else {
        result = [];
        tempSet.forEach( (item, itemAgain, tempSet) => {  
          let temp = '^' + item + '|\\s' + item ;
          let pattern = new RegExp(temp, 'g');
          let tempStr = [...value].join(' ');
          let matches = tempStr.match(pattern);
          if (matches.length > 1) {
              result.push([+item, matches.length]);
          }
        });
        return result.sort( (a,b)=>b[1]-a[1] );
      }
    };
    
    let analizeResult = function(){
      let flush =  hasOneSuit(); 
      let straight = searchStraight();
      let equal = searchEqual();
      
      if (flush && straight) return {
      combStrenght : 9, name : 'Straight flush', mainCard : +value[0], kicker : [] }
      else if ( equal.length && equal[0][1] === 4 ) return {
      combStrenght : 8, name : 'Four of a kind', mainCard : +value[2], kicker : [value[0] === value[2] ? +value[4] : +value[0]] }
      else if ( equal.length == 2 && equal[0][1] === 3 && equal[1][1] === 2) return {
      combStrenght : 7, name : 'Full house', mainCard : equal[0][0], kicker : [equal[1][0] ]}
      else if ( flush ) return {
      combStrenght : 6, name : 'Flush', mainCard : +value[0], kicker : [+value[1], +value[2], +value[3], +value[4] ]}
      else if ( straight ) return {
      combStrenght : 5, name : 'Straight', mainCard : +value[0], kicker : []}
      else if ( equal.length == 1 && equal[0][1] === 3 ) return {
      combStrenght : 4, name : 'Three of a kind', mainCard : equal[0][0], kicker : (function(){let temp = []; value.forEach((item)=>{if (+item !== equal[0][0]) temp.push(+item)});return temp})()}
      else if ( equal.length == 2 ) return {
      combStrenght : 3, name : 'Two pairs', mainCard : equal[0][0], kicker : [equal[1][0], equal[1][0], (function(){value.forEach((item)=>{if (+item !== equal[0][0] && +item !== equal[1][0]) return +item})})() ]}
      else if ( equal.length == 1) return {
      combStrenght : 2, name : 'Pair', mainCard : equal[0][0], kicker : (function(){let temp = []; value.forEach((item)=>{if (+item !== equal[0][0]) temp.push(+item)});return temp})()}
      else return {
      combStrenght : 1, name : 'Highcard', mainCard : +value[0], kicker : [+value[1], +value[2], +value[3], +value[4] ]}
    }
    let result = analizeResult();
    
    return result
    }
    
    let firstPlayerResult = analizeHand(player1);
    let secondPlayerResult = analizeHand(player2);
    let matchResult;
    
    let deepCompare = function(firstHand, secondHand){
      if (firstHand.mainCard > secondHand.mainCard){
        return 1
      }
      else if (firstHand.mainCard < secondHand.mainCard){
        return 2
      }
      else {
        if (!firstHand.kicker.length) return 3
        else {
          for (let i = 0; i < firstHand.kicker.length; i++) {
            if(firstHand.kicker[i] > secondHand.kicker[i]) return 1
            else if (firstHand.kicker[i] < secondHand.kicker[i]) return 2
          }
          return 3
        }
      }
    };
    
    if (firstPlayerResult.combStrenght !== secondPlayerResult.combStrenght) {
      if (firstPlayerResult.combStrenght > secondPlayerResult.combStrenght) {
        matchResult = 1;
      }
      else matchResult = 2;
    }
    else matchResult = deepCompare(firstPlayerResult, secondPlayerResult); 
    console.dir(firstPlayerResult, secondPlayerResult);
    return matchResult
}
