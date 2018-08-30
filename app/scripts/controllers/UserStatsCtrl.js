(function(){
  function UserStatsCtrl(UsersFactory, $location){

    UsersFactory.showUser();

    this.UsersFactory = UsersFactory;

  }
  angular
  .module('hangman')
  .controller('UserStatsCtrl', ['UsersFactory', '$location', UserStatsCtrl]);

})();
