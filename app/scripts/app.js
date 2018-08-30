(function() {
  function config($locationProvider, $stateProvider) {

    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: false
      });

    $stateProvider
      .state('signInPage', {
        url: '/',
        controller: 'SignInPageCtrl as signInPage',
        templateUrl: '/templates/signInPage.html'
      })
      .state('gameBoard', {
        url: '/gameBoard',
        controller: 'GameBoardCtrl as gameBoard',
        templateUrl: '/templates/gameBoard.html'
      });
  }

  angular
    .module('hangman', ['ui.router', 'ui.bootstrap', 'ngCookies', 'ngRoute'])
    .config(config);
})();
