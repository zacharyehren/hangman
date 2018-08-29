(function() {
    function GameBoardCtrl(WordFactory, $location) {
      ctrl = this;
      let challengeWord;
      let challengeWordArray;
      let incorrectGuesses = 0;
      let frm = document.getElementsByName('guessLetter')[0];

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
            ctrl.incorrectLetters.push(ctrl.letter);
            if (incorrectGuesses == 6) {
              $('#gameOverModal').modal({backdrop: 'static', keyboard: false});
              incorrectGuesses = 0;
            }
          }
          frm.reset();
        }

        ctrl.WordFactory = WordFactory;

      }

      angular
        .module('hangman')
        .controller('GameBoardCtrl', ['WordFactory', '$location', GameBoardCtrl]);
    })();
