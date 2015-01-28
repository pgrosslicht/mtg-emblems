'use strict';

/**
 * @ngdoc function
 * @name mtgEmblemsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mtgEmblemsApp
 */
angular.module('mtgEmblemsApp')
  .controller('MainCtrl', function ($scope, $http) {
      var rng = null;
      $scope.show_emblems = [];
      $scope.index = 0
      $scope.rounds = 0;

      $scope.reset = function () {
        $scope.show_emblems = [];
        shuffleArray($scope.emblems, false);
        $scope.rounds = 0
        $scope.index = 0
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
        $scope.show_emblems.push(to_add);
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
        shuffleArray($scope.emblems, false);
        rng = new Math.seedrandom();
      })
      .error(function(data, status, headers, config) {
      
      });
  });
