'use strict';

/**
 * @ngdoc function
 * @name mtgEmblemsApp.controller:HostCtrl
 * @description
 * # HostCtrl
 * Controller of the mtgEmblemsApp
 */
angular.module('mtgEmblemsApp')
  .controller('HostCtrl', function ($scope, $routeParams, $http, $firebase) {
      var ref = new Firebase("https://mtg-emblems.firebaseio.com/" + $routeParams.gameId);
      var root = $firebase(ref);
      var emblems = $firebase(ref.child("emblems"));
      var metadata = $firebase(ref.child("metadata"));
      var rng = null;
      $scope.show_emblems = emblems.$asArray();
      

      $scope.index = 0;
      $scope.rounds = 0;

      $scope.reset = function () {
        root.$remove();
        shuffleArray($scope.emblems);
        $scope.rounds = 0;
        $scope.index = 0;
      }

      $scope.next = function (permanent, automatic) {
        var i, draw_others = 0;
        var draw_others_as_permanent = false;
        var to_add = null;
        to_add = $scope.getRandomCard();
        if (permanent) {
          to_add.type = 'permanent';
        }
        if (automatic) {
          to_add.is_automatic = true;
        } else {
          $scope.rounds++;
        }
        $scope.show_emblems.$add(to_add);
        if (to_add.draw_others > 0) {
          draw_others = to_add.draw_others;
          if (to_add.permanent) {
            draw_others_as_permanent = to_add.permanent;
          }
          for (i = 0; i < draw_others; i++) {
            $scope.next(draw_others_as_permanent, true);
          }
        }
      };

      $scope.getRandomCard = function () {
        var rand_index = Math.floor(rng() * $scope.emblems.length);
        var emblem = JSON.parse(JSON.stringify($scope.emblems[rand_index]));
        emblem.id = $scope.index++;
        emblem.type = 'standard';
        return emblem;
      }

    $http.get('./data/emblems.json')
      .success(function(data, status, headers, config){
        $scope.emblems = data;
        shuffleArray($scope.emblems);
        rng = new Math.seedrandom();
      })
      .error(function(data, status, headers, config) {
      
      });
  });
