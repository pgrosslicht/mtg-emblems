'use strict';

/**
 * @ngdoc function
 * @name mtgEmblemsApp.controller:HostCtrl
 * @description
 * # HostCtrl
 * Controller of the mtgEmblemsApp
 */
angular.module('mtgEmblemsApp')
  .controller('HostCtrl', function ($scope, $route, $routeParams, $http, $firebaseObject) {
      var root = firebase.database().ref($routeParams.gameId);
      var metadata = $firebaseObject(root.child('metadata'));
      metadata.$bindTo($scope, 'metadata');
      var rng = null;
      $scope.showEmblems = [];
      $scope.gameId = $routeParams.gameId;

    $http.get('./data/emblems.json')
      .success(function(data, status, headers, config){
        $scope.emblems = data;
        metadata.$loaded().then(function() {
          if (angular.isUndefined($scope.metadata.rounds)) {
            $scope.metadata.rounds = 0;
            $scope.metadata.seed = makeId(32);
          }
          shuffleArray($scope.emblems, $scope.metadata.seed);
          rng = new Math.seedrandom($scope.metadata.seed);
          var rounds = $scope.metadata.rounds;
          for (var i = 0; i < rounds; i++) {
            $scope.next(false, false);
          }
          metadata.$watch(function() {
            if (metadata.rounds === 0) {
              $route.reload();
            } else {
              $scope.next(false, false);
            }
          });
        });
      })
      .error(function(data, status, headers, config) {
      
      });

      $scope.reset = function () {
        $scope.metadata.rounds = 0;
        $scope.metadata.seed = makeId(32);
        $scope.showEmblems = [];
        shuffleArray($scope.emblems, $scope.metadata.seed);
        rng = new Math.seedrandom($scope.metadata.seed);
      };

      $scope.incrementRounds = function () {
        $scope.metadata.rounds++;
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

  });
