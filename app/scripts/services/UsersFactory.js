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
      var user_request = {
        method: 'POST',
        url: 'http://localhost:3000/users/authenticate',
        data: {
          username: username,
          password: password
        }
      };

      $http(user_request).then(function successCallback(response) {
        currentUser = response.data
        retrieveUserInfo();
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
        retrieveUserInfo();
        console.log(newUser);
      });
    };

    UsersFactory.showUser = function() {
      var currentUser = {
        method: 'GET',
        url: 'http://localhost:3000/users/' + $cookies.get('userId'),
      };

      $http(currentUser).then(function successCallback(response) {
        UsersFactory.showUserData = response.data;
        console.log(UsersFactory.showUserData);
      });
    };

    UsersFactory.updateUser = function(wins, losses, totalGames, average) {
      var updateUser = {
        method: 'PUT',
        url: 'http://localhost:3000/users/' + $cookies.get('userId'),
        data: {
          users: {
            id: $cookies.get('userId'),
            wins: wins,
            losses: losses,
            total_games: totalGames,
            average: average
          }
        }
      };

      $http(updateUser).then(function successCallback(response) {
        currentUser = response.data;
      });
    };

    UsersFactory.gameCompleted = function(wins, losses){
      userStats.wins += wins;
      userStats.losses += losses;
      userStats.totalGames += 1;
      userStats.average = (userStats.wins / userStats.totalGames)
      UsersFactory.updateUser(userStats.wins, userStats.losses, userStats.totalGames, userStats.average)
      console.log(userStats);
    };

    const retrieveUserInfo = function(){
      $cookies.put('username', currentUser.username);
      $cookies.put('userId', currentUser.id);
      if (currentUser.total_games == null) {
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
