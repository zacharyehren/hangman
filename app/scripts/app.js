(function() {
  function config($locationProvider, $stateProvider) {

    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: false
      });

    $stateProvider
      .state('gameBoard', {
        url: '/',
        controller: 'GameBoardCtrl as gameBoard',
        templateUrl: '/templates/gameBoard.html'
      })
  }

  angular
    .module('hangman', ['ui.router', 'ui.bootstrap', 'ngRoute'])
    .config(config);
})();
