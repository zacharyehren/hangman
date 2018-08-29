(function() {
    function GameBoardCtrl(WordFactory, $location) {
      ctrl = this;
      let challengeWord;
      let challengeWordArray;
      let incorrectGuesses = 0;
      let frm = document.getElementsByName('guessLetter')[0];
      ctrl.showIncorrect = false;


      const createPuzzle = function() {
        challengeWord = localStorage.getItem("challengeWord");
        challengeWordArray = challengeWord.split("");
        ctrl.puzzle = [];
        ctrl.incorrectLetters = [];
        for (let i = 0; i < challengeWord.length; i++) {
          ctrl.puzzle.push("_");
        }
      }

      ctrl.newGame = function() {
        WordFactory.retrieveWord().then(function() {
          createPuzzle();
          ctrl.showIncorrect = true;
          ctrl.guessesLeft = 6;
          incorrectGuesses = 0;
          ctrl.playerWon = false;
          ctrl.playerLost = false;
        });
      };

      ctrl.submitLetter = function() {
        ctrl.letter = ctrl.letter.toLowerCase();
          if (challengeWord.includes(ctrl.letter)) {
            for (let i = 0; i <= challengeWordArray.length; i++) {
              if (ctrl.letter == challengeWordArray[i]) {
                ctrl.puzzle.splice(i, 1, ctrl.letter);
              }
            }
          } else {
            incorrectGuesses += 1;
            ctrl.guessesLeft -= 1;
            ctrl.incorrectLetters.push(ctrl.letter);
          }
          frm.reset();
          gameOver();
        }

        const gameOver = function(){
          if (!ctrl.puzzle.includes("_")) {
            ctrl.playerWon = true;
            $('#gameOverModal').modal({backdrop: 'static', keyboard: false});
          } else if (incorrectGuesses == 6) {
            ctrl.playerLost = true;
            $('#gameOverModal').modal({backdrop: 'static', keyboard: false});
          }
        }

      }

      angular
        .module('hangman')
        .controller('GameBoardCtrl', ['WordFactory', '$location', GameBoardCtrl]);
    })();
