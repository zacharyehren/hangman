(function(){
  function GameboardCtrl(WordFactory) {
    ctrl = this;

    let challengeWord = localStorage.getItem("challengeWord");

    ctrl.puzzle = [];

    const createPuzzle = function(){
      for (let i = 0; i <= challengeWord.length; i++) {
        ctrl.puzzle.push("_");
      }
    }

    createPuzzle();

    this.newGame = function() {
      WordFactory.retrieveWord();
    };


    this.WordFactory = WordFactory;
  }

  angular
    .module('hangman')
    .controller('GameboardCtrl', ['WordFactory', GameboardCtrl]);
})();
