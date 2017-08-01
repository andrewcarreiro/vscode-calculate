
export function indexToAlpha ( index : number ) {
	let currentIndex = index;
	let currentOutputString = "";
	const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

	do {
		let chosenAlpha = alphabet[currentIndex % alphabet.length];
		currentOutputString = chosenAlpha + currentOutputString;
		currentIndex -= alphabet.length;
	} while (currentIndex >= 0 );

	return currentOutputString;
}