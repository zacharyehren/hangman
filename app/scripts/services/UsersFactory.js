(function() {
  function UsersFactory($http, $cookies) {

    const UsersFactory = {};
    let currentUser;
    let userStats = {};

    // UsersFactory.user_signed_in = function() {
    //   if ($cookies.get('blocitoffUserId') != undefined) {
    //     ListsApiRequests.setLists();
    //   }
    // }


    UsersFactory.signInUser = function(username, password) {
      var users_request = {
        method: 'POST',
        url: 'http://localhost:3000/users/authenticate',
        data: {
          username: username,
          password: password
        }
      };

      $http(users_request).then(function successCallback(response) {
        currentUser = response.data
        updateUserInfo();
        console.log(currentUser);
      });
    };


    UsersFactory.createUser = function(username, password) {
      var newUser = {
        method: 'POST',
        url: 'http://localhost:3000/users/',
        data: {
          users: {
            username: username,
            password: password
          }
        }
      };

      $http(newUser).then(function successCallback(response) {
        currentUser = response.data;
        updateUserInfo();
        console.log(newUser);
      });
    };

    UsersFactory.updateUser = function(userId, wins, losses, totalGames) {
      var newUser = {
        method: 'PUT',
        url: 'http://localhost:3000/users/' + userId,
        data: {
          users: {
            id: userId,
            wins: wins,
            losses: losses,
            total_games: totalGames
          }
        }
      };

      $http(newUser).then(function successCallback(response) {
        currentUser = response.data;
        updateUserInfo();
        console.log(newUser);
      });
    };

    UsersFactory.gameCompleted = function(wins, losses){
      userStats.wins += wins;
      userStats.losses += losses;
      userStats.totalGames += 1;
      UsersFactory.updateUser($cookies.get('userId'), userStats.wins, userStats.losses += losses, userStats.totalGames += 1)
    };

    const updateUserInfo = function(){
      $cookies.put('username', currentUser.username);
      $cookies.put('userId', currentUser.id);
      if (userStats.totalGames == null) {
        userStats.wins = 0;
        userStats.losses = 0;
        userStats.totalGames = 0;
      } else {
        userStats.wins = currentUser.wins;
        userStats.losses = currentUser.losses;
        userStats.totalGames = currentUser.total_games;
      }
      console.log(userStats)
    }

    return UsersFactory;
  };

  angular
    .module('hangman')
    .factory('UsersFactory', ['$http', '$cookies', UsersFactory]);
})();
