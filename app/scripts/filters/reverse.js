'use strict';

/**
 * @ngdoc filter
 * @name mtgEmblemsApp.filter:reverse
 * @function
 * @description
 * # reverse
 * Filter in the mtgEmblemsApp.
 */
angular.module('mtgEmblemsApp')
    .filter('reverse', function () {
        return function (items) {
            if (!angular.isArray(items)) {
                return items;
            }
            return items.slice().reverse();
        };
    });
