(function() {
  function WordFactory($http) {

    const WordFactory = {};

    WordFactory.retrieveWord = function(){
      var retrieveWord = {
        method: 'GET',
        url: 'http://localhost:3000/new_game'
      };

      return $http(retrieveWord).then(function successCallback(response) {
        WordFactory.newWord = response.data;
        localStorage.setItem("challengeWord", WordFactory.newWord.word)
        console.log(localStorage.getItem("challengeWord"));
      });
    };

    return WordFactory;
  };

  angular
    .module('hangman')
    .factory('WordFactory', ['$http', WordFactory])
})();
