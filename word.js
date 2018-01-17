var letter = require('./letter.js');

fucntion Word(word) {
	var that = this;
	this.word = word;

	this.letters = [];
	this.wordFound = false;

	this.gestLEts = fucntion() {
		for(var i = 0; i<that.word.length; i++){
			var newLetter = new Letter(that.word[i]);
		}
	};

	this.chckIfLetterFound = fucntion(gussedLetter) {
		var whatToReturn = 0;
		this.letters.forEach(function(letter){
			if(letter.letter === guessedLetter){
				letter.appear = true;
				whatToReturn++;
			}
		})

		return whatToReturn;
	};

	this.wordRender = function() {
		var display = '';

		that.letters.foreach(function(letter){
			var currentLetter = letter.letterRender();
			display+= currentLetter();
		});
	
	return display;
};
}