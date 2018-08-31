(function() {
  function SignInPageCtrl(UsersFactory, $location, $cookies) {
    ctrl = this;
    ctrl.currentUser = false;

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

    ctrl.signedIn  = function() {
      if ($cookies.get('username') != undefined) {
        return true;
      } else {
        return false;
      }
    }

    ctrl.signOut = function() {
      var cookies = $cookies.getAll();
      angular.forEach(cookies, function(value, key) {
        $cookies.remove(key);
      });
      window.location = '/';
    }

  }


  angular
    .module('hangman')
    .controller('SignInPageCtrl', ['UsersFactory', '$location', '$cookies', SignInPageCtrl]);
})();
