'use strict';

/**
 * @ngdoc filter
 * @name mtgEmblemsApp.filter:italicize
 * @function
 * @description
 * # italicize
 * Filter in the mtgEmblemsApp.
 */
angular.module('mtgEmblemsApp')
  .filter('italicize', function ($sce) {
    return function (input) {
      var output = input.replace(/\*(.*?)\*/gi, function(_, match) {
        return '<span style="font-style: italic">' + match + '</span>';
      });
      return $sce.trustAsHtml(output);
    };
  });
