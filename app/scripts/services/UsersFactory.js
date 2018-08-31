(function() {
  function UsersFactory($http, $cookies) {

    const UsersFactory = {};
    let currentUser;
    let userStats = {};

    const createCookies = function(user) {
      $cookies.put('username', user.username);
      $cookies.put('userId', user.id);
    }

    const retrieveUserInfo = function(user) {
      createCookies(user);
      userStats.wins = user.wins;
      userStats.losses = user.losses;
      userStats.totalGames = user.total_games;
      console.log(userStats)
    }

    const saveNewUserData = function(user) {
      createCookies(user);
      userStats.wins = 0;
      userStats.losses = 0;
      userStats.totalGames = 0;
    }


    UsersFactory.signInUser = function(username, password) {
      var userSignedIn = {
        method: 'POST',
        url: 'http://localhost:3000/users/authenticate',
        data: {
          username: username,
          password: password
        }
      };

      $http(userSignedIn).then(function successCallback(response) {
        currentUser = response.data
        retrieveUserInfo(currentUser);
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
        saveNewUserData(currentUser);
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
        retrieveUserInfo(UsersFactory.showUserData);

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
        console.log(currentUser);
      });
    };


    UsersFactory.gameCompleted = function(wins, losses) {
      console.log(userStats);
      userStats.wins += wins;
      userStats.losses += losses;
      userStats.totalGames += 1;
      userStats.average = (userStats.wins / userStats.totalGames)
      UsersFactory.updateUser(userStats.wins, userStats.losses, userStats.totalGames, userStats.average)
      console.log(userStats);

    };


    return UsersFactory;
  };

  angular
    .module('hangman')
    .factory('UsersFactory', ['$http', '$cookies', UsersFactory]);
})();
