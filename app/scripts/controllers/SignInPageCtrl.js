(function() {
  function SignInPageCtrl(UsersFactory, $location, $cookies) {
    ctrl = this;
    ctrl.currentUser = false;
    ctrl.userSignedIn = false;

    const userSignedIn = function() {
      if ($cookies.get('username') != undefined) {
        window.location = '/gameBoard';
      };
    }

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

    userSignedIn();

  }


  angular
    .module('hangman')
    .controller('SignInPageCtrl', ['UsersFactory', '$location', '$cookies', SignInPageCtrl]);
})();
