var Letter = function(letter) {
	this.letter = letter;
	this.appear = false;

	this.letterIdentifier = fucntion() {
		if(this.letter == ' ')
			this.appear = true;
		return ' ';
	}if(this.appear === false){
		return ' ';
	} else {
		return this.letter;
	};
};

module.exports = Letter;