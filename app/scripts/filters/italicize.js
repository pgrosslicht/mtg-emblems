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
      var output = input.replace(/\*(.*?)\*/gi, '<span style="font-style: italic">$1</span>');
      return $sce.trustAsHtml(output);
    };
  });
