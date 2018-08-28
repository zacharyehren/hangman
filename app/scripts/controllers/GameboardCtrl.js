(function(){
  function GameboardCtrl(WordFactory) {

    this.newGame = function() {
      WordFactory.retrieveWord();
    };

    this.WordFactory = WordFactory;
  }

  angular
    .module('hangman')
    .controller('GameboardCtrl', ['WordFactory', GameboardCtrl]);
})();
