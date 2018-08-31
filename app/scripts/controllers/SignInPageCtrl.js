(function() {
  function SignInPageCtrl(UsersFactory, $location, $cookies) {
    ctrl = this;
    ctrl.currentUser = false;
    ctrl.userSignedIn = false;


    ctrl.submitUser = function() {
      if (ctrl.username == undefined || ctrl.password == undefined) {
        alert("Username and Password cannot be blank!")
      } else {
        if (ctrl.currentUser == false) {
          UsersFactory.createUser(ctrl.username, ctrl.password);
        } else {
          UsersFactory.signInUser(ctrl.username, ctrl.password);
        }
        $location.path('/gameBoard')
      }
    }


  }


  angular
    .module('hangman')
    .controller('SignInPageCtrl', ['UsersFactory', '$location', '$cookies', SignInPageCtrl]);
})();
