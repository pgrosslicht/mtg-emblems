'use strict';

/**
 * @ngdoc filter
 * @name mtgEmblemsApp.filter:manaSymbols
 * @function
 * @description
 * # manaSymbols
 * Filter in the mtgEmblemsApp.
 */
angular.module('mtgEmblemsApp')
  .filter('manaSymbols', function ($sce) {
    return function (input) {
      var output = input.replace(/\{(([0-9BWRUGPSTQXYZHC]+)|INF|Tv[23]|WOld|Slash)\}/g, function(match, match2) {
        return '<svg xmlns="http://www.w3.org/2000/svg" class="icon-mana mana-' + match2 + '"><use xlink:href="#' + match2 + '"></use></svg>';
      });
      return $sce.trustAsHtml(output);
    };
  });
