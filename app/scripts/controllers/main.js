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
      $scope.showEmblems = [];
      $scope.rounds = 0;
      $scope.gameId = makeId(5);

      $scope.reset = function () {
        $scope.showEmblems = [];
        shuffleArray($scope.emblems, false);
        $scope.rounds = 0;
      };

      $scope.next = function (permanent, automatic) {
        var i, drawOthers, drawOthersAsPermanent = 0;
        var toAdd = null;
        toAdd = $scope.getRandomCard();
        if (permanent || toAdd.isPermanent) {
          toAdd.type = 'permanent';
        }
        if (automatic) {
          toAdd.isAutomatic = true;
        } else {
          $scope.rounds++;
        }
        $scope.showEmblems.push(toAdd);
         if (toAdd.drawOthers > 0) {
          drawOthers = toAdd.drawOthers;
          for (i = 0; i < drawOthers; i++) {
            $scope.next(false, true);
          }
        }
        if (toAdd.drawOthersAsPermanent > 0) {
          drawOthersAsPermanent = toAdd.drawOthersAsPermanent;
          for (i = 0; i < drawOthersAsPermanent; i++) {
            $scope.next(true, true);
          }
        }
      };

      $scope.getRandomCard = function () {
        var randIndex = Math.floor(rng() * $scope.emblems.length);
        var emblem = JSON.parse(JSON.stringify($scope.emblems[randIndex]));
        emblem.type = 'standard';
        return emblem;
      };

    $http.get('./data/emblems.json')
      .success(function(data, status, headers, config){
        $scope.emblems = data;
        shuffleArray($scope.emblems, false);
        rng = new Math.seedrandom();
      })
      .error(function(data, status, headers, config) {
      
      });
  });
