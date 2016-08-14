'use strict';

/**
 * @ngdoc overview
 * @name mtgEmblemsApp
 * @description
 * # mtgEmblemsApp
 *
 * Main module of the application.
 */
angular
  .module('mtgEmblemsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebaseObject'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/play/:gameId', {
        templateUrl: 'views/play.html',
        controller: 'HostCtrl'
      })
      .when('/watch/:gameId', {
        templateUrl: 'views/watch.html',
        controller: 'HostCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

var shuffleArray = function(array, seed) {
  var m = array.length, t, i;
  var rng = null;
  if (seed === false) {
    rng = new Math.seedrandom();
  } else {
    rng = new Math.seedrandom(seed);
  }

  // While there remain elements to shuffle
  while (m) {
    // Pick a remaining element…
    i = Math.floor(rng() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
};

var makeId = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for( var i=0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};
