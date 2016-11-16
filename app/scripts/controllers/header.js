'use strict';

/**
 * @ngdoc function
 * @name mtgEmblemsApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the mtgEmblemsApp
 */
angular.module('mtgEmblemsApp')
    .controller('HeaderCtrl', function ($scope, $location) {
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
    });
