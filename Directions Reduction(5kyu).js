function dirReduc(arr){
  // ...
  let tempArr = [...arr];
  let expSearch = (item, i, array) => {
       return i !== array.length - 1 ? ( (item.toLowerCase() === `north` && array[i+1].toLowerCase() === `south`) ||
         (item.toLowerCase() === `south` && array[i+1].toLowerCase() === `north`) ||
         (item.toLowerCase() === `east` && array[i+1].toLowerCase() === `west`) ||
         (item.toLowerCase() === `west` && array[i+1].toLowerCase() === `east`) ) : false
        };
  while ( tempArr.some(expSearch) ) {
      let indx = tempArr.findIndex(expSearch);
      tempArr.splice(indx, 2);  
  }  
  return tempArr
