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
      var output = input.replace(/\{([0-9BWRUGPSTQXYZ]+)\}/g, function(match, match2) {
        return "<i class=\"mana nk_icon_" + match2.toLowerCase() + "\" title=\"" + match + "\"></i>";
      });
      return $sce.trustAsHtml(output);
    };
  });
