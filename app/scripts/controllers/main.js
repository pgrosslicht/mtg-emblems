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
    $http.get('/data/emblems.json')
      .then(function(res){
        $scope.all_emblems = res.data;
        $scope.emblems = res.data;
        $scope.show_emblems = [];
        shuffleArray($scope.emblems);
        shuffleArray($scope.all_emblems);

        $scope.emblem_index = 0;
        $scope.total_index = 0;
        $scope.rounds = 0;

        $scope.reset = function () {
          $scope.show_emblems = [];
          shuffleArray($scope.emblems);
          shuffleArray($scope.all_emblems);
          $scope.rounds = 0;
          $scope.total_index = 0;
          $scope.emblem_index = 0;
        }

        $scope.next = function (permanent, automatic) {
          var i, draw_others = 0;
          var draw_others_as_permanent = false;
          var to_add = null;
          if ($scope.emblem_index >= $scope.emblems.length - 1) {
              shuffleArray($scope.emblems);
              $scope.emblem_index = 0;
          } else {
              $scope.emblem_index++;
          }
          if (permanent) {
            shuffleArray($scope.all_emblems);
            to_add = JSON.parse(JSON.stringify($scope.all_emblems[0]));
          } else {
            to_add = JSON.parse(JSON.stringify($scope.emblems[$scope.emblem_index]));
          }
          to_add.id = $scope.total_index;
          $scope.total_index++;
          if (permanent) {
            to_add.type = 'permanent';
          } else {
            to_add.type = 'standard';
          }
          if (automatic) {
            to_add.is_automatic = true;
          } else {
            $scope.rounds++;
          }
          $scope.show_emblems.push(to_add);
          if ($scope.emblems[$scope.emblem_index].draw_others > 0) {
            draw_others = $scope.emblems[$scope.emblem_index].draw_others;
            if ($scope.emblems[$scope.emblem_index].permanent) {
              draw_others_as_permanent = $scope.emblems[$scope.emblem_index].permanent;
            }
            for (i = 0; i < draw_others; i++) {
              $scope.next(draw_others_as_permanent, true);
            }
          }
        };
    })
});
