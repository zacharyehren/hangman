(function() {
  function config($locationProvider, $stateProvider) {

    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: false
      });

    $stateProvider
      .state('gameboard', {
        url: '/',
        controller: 'GameboardCtrl as gameboard',
        templateUrl: '/templates/gameboard.html'
      })
  }

  angular
    .module('hangman', ['ui.router', 'ui.bootstrap', 'ngRoute'])
    .config(config);
})();
