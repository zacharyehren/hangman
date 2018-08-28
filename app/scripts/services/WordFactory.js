(function() {
  function WordFactory($http) {

    var WordFactory = {};

    WordFactory.retrieveWord = function(){
      var retrieveWord = {
        method: 'GET',
        url: 'http://localhost:3000/new_game'
      };

      return $http(retrieveWord).then(function successCallback(response) {
        WordFactory.newWord = response.data;
        console.log(WordFactory.newWord)
      });
    };

    return WordFactory;
  };

  angular
    .module('hangman')
    .factory('WordFactory', ['$http', WordFactory])
})();
