(function() {
    function GameboardCtrl(WordFactory, $location) {
      ctrl = this;
      let challengeWord;
      let challengeWordArray;

      const createPuzzle = function() {
        challengeWord = localStorage.getItem("challengeWord");
        challengeWordArray = challengeWord.split("");
        ctrl.puzzle = [];
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
          if (challengeWord.includes(ctrl.letter)) {
            for (let i = 0; i <= challengeWordArray.length; i++) {
              if (ctrl.letter == challengeWordArray[i]) {
                ctrl.puzzle.splice(i, 1, ctrl.letter);
              }
            }
          }
          let frm = document.getElementsByName('guessLetter')[0];
          frm.reset();
        }


        ctrl.WordFactory = WordFactory;

      }

      angular
        .module('hangman')
        .controller('GameboardCtrl', ['WordFactory', '$location', GameboardCtrl]);
    })();
