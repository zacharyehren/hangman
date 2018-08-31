(function() {
  function GameBoardCtrl(WordFactory, UsersFactory, $location) {
    ctrl = this;
    let challengeWord;
    let challengeWordArray;
    let incorrectGuesses = 0;
    let frm = document.getElementsByName('guessLetter')[0];
    ctrl.gameStarted = false;


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
        ctrl.gameStarted = true;
        ctrl.guessesLeft = 6;
        incorrectGuesses = 0;
        ctrl.playerWon = false;
        ctrl.playerLost = false;
      });
    };

    ctrl.submitLetter = function() {
      if (ctrl.letter != undefined) {
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
        gameOver();
      } else {
        alert("Enter a swashbucklin' letter!")
      }
      frm.reset();
    }

    const gameOver = function() {
      if (!ctrl.puzzle.includes("_")) {
        ctrl.playerWon = true;
        $('#gameOverModal').modal({
          backdrop: 'static',
          keyboard: false
        });
        UsersFactory.gameCompleted(1, 0);
      } else if (incorrectGuesses == 6) {
        ctrl.playerLost = true;
        UsersFactory.gameCompleted(0, 1);
        $('#gameOverModal').modal({
          backdrop: 'static',
          keyboard: false
        });
      }
    }

  // prevents user data from being erased upon page refresh
      UsersFactory.showUser();


  }

  angular
    .module('hangman')
    .controller('GameBoardCtrl', ['WordFactory', 'UsersFactory', '$location', GameBoardCtrl]);
})();
