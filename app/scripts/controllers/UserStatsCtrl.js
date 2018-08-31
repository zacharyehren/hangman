(function(){
  function UserStatsCtrl(UsersFactory, $location, $cookies){

    ctrl = this;

    UsersFactory.showUser();

    ctrl.username = $cookies.get('username');

    ctrl.UsersFactory = UsersFactory;

  }
  angular
  .module('hangman')
  .controller('UserStatsCtrl', ['UsersFactory', '$location', '$cookies', UserStatsCtrl]);

})();
