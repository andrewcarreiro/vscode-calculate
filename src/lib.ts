
export function indexToAlpha ( index : number ) {
	let currentIndex = index;
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const BASE = alphabet.length;
  let places = 0;
  let output = [];

  if( index < 26 ){
    return alphabet[index];
  }

  // find number of positions in index when converted to base 25
  let tmpNumber = 0;
  tmpNumber = Math.pow(BASE,places);
  while( tmpNumber < index ){
    tmpNumber = Math.pow(BASE,places);
    places ++;
  }

  // console.log(`places: ${places} in ${index}`);

  // work our way back from the big number, assigning values as we go
  for( let i=places; i>=0; i--){
    const column = Math.pow(BASE,i);
    const chosenValue = Math.floor(currentIndex / column );
    // console.log(`col: ${column}, chosenValue ${index}`);
    output.push(chosenValue);
    currentIndex -= chosenValue;
  }

  // output.shift();
  return output.map( v => alphabet[v]).join("");


  // so I'm not converting to 
  // 


	// do {
  //   // console.log('current index: '+currentIndex);
  //   let chosenAlpha = alphabet[currentIndex % alphabet.length];
  //   console.log(index+': chosen alpha - '+chosenAlpha+' - currentindex - '+currentIndex);
	// 	currentOutputString = chosenAlpha + currentOutputString;
	// 	currentIndex -= alphabet.length;
	// } while (currentIndex >= 0 );

	// return output;
}

/**
  5
        5
  105
  1 0 5

  54
  0 5  4

  284
  10^2 10^1 10^0
  100  10   1
  2    8    4


  0005
  aaaf
**/