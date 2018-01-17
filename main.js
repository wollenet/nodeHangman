var inquirer = require('inquirer');
var isLetter = require('is-letter');
var Word = require('./word.js');
var Game = require('./game.js');
var hangManDisplay = Game.newWord.hangman;

require('events').EventEmitter.prototype._maxListeners = 100;

var hangman = {
	wordBank: Game.newWord.wordList,
	guessesRmaining: 15,
	gussedLetters: [],
	display: 0,
	currentWord: null,
	startGame: fucntion() {
		var that = this;
		if(this.guessedLetters.length > 0){
			this.guessedLetters = [];
		}

		inquirer.prompt([{
			name: "play",
			type: "confirm",
			message: "Want to play?"
		}]).then(function(answer) {
			if(answer.play){
				that.newGame();
			} else{
				console.log('Why not? Oh well your loss!');
			}
		})},

		newGame: function() {
			if(this.guessesRemaining === 15) {
				console.log("Let the Games begin!");
				console.log('--------------');

				var randomNumber = Math.floor(Math.random()*this.wordBank.length);
				this.currentWord = new Word(this.wordBank[randomNumber]);
				this.currentWord.getLets();

				console.log(this.currentWord.wrodRender());
				this.continuePromptingPlayer();
			} else{
				this.resetGuessesRemaining();
				this.newGame();
			}
		},
		resetGuessesRemaining: function() {
			this.guessesRmaining = 15;
		},
		continuePromptingPlayer : function(){
			var that = this;

			inquirer.prompt([{
				name: "letterchosen",
				type: "input",
				message: "choose a letter:",
				validate: function(value) {
					if(isLetter(value)){
						return true;
					} else{
						return false;
					}
				}
			}]).then(function(letter) {

				var letterReturned = (letter.letterchosen).toupperCase();

				var guessedAleready = false;

				for(var i = 0; i<that.gussedLetters.length; i++){
					if(letterReturned === that.guessedLetters[i]){
						guessedAleready = true;
					}
				}

				if(guessedAleready === false){
					that.gussedLetters.push(letterReturned);

					var found = that.currentWord.checkIfLetterFound(letterReturned);

					if(found === 0){
						console.log('Sorry! Try again.')
						 that.guessesRmaining--;
						 that.display++;
						 console.log('guesses remaining: ' + that.guessesRmaining);
						 console.log('\n-----------');
						 console.log(that.currentWord.wrodRender());
						 console.log('\n-----------');
					}
					else{
						cnonsole.log('You got it! Great Job!')

						if(that.currentWord.wasWordFound() === true){
							console.log(that.currentWord.wrodRender());
							console.log('Congratulation! Your a winner!');
						}
						else{
							console.log('guesses remaining' + that.guessesRemaining);
							console.log(that.currentWord.wordRender());
							console.log('\n-----------');
							console.log("letter guessed: " + that.letterchosen)
						}
					}
					if(that.guessesRemaining > 0 && that.currentWord.WordFound === false) {
						that.continuePromptingPlayer();
					}else if(that.guessesRemaining === 0){
						console.log('End of Game');
						console.log('That word you were trying to guess was:' + that.currentWord.word);
					}
				}else{
					console.log("You have already tried that word! Pick a different one.")
					that.continuePromptingPlayer();
				}
			});
		}
	}

	nodehagman.startGame();