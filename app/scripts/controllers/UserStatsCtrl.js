(function(){
  function UserStatsCtrl(UsersFactory, $location, $cookies){

    ctrl = this;
    ctrl.username = $cookies.get('username');
    ctrl.UsersFactory = UsersFactory;

    UsersFactory.showUser();

  }
  angular
  .module('hangman')
  .controller('UserStatsCtrl', ['UsersFactory', '$location', '$cookies', UserStatsCtrl]);

})();
