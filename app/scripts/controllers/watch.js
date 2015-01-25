'use strict';

/**
 * @ngdoc function
 * @name mtgEmblemsApp.controller:WatchCtrl
 * @description
 * # WatchCtrl
 * Controller of the mtgEmblemsApp
 */
angular.module('mtgEmblemsApp')
  .controller('WatchCtrl', function ($scope, $routeParams, $firebase) {
      var ref = new Firebase("https://mtg-emblems.firebaseio.com/" + $routeParams.gameId);
      var sync = $firebase(ref.child("emblems"));
      $scope.show_emblems = sync.$asArray();
  });
