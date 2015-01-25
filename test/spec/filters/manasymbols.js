'use strict';

describe('Filter: manaSymbols', function () {

  // load the filter's module
  beforeEach(module('mtgEmblemsApp'));

  // initialize a new instance of the filter before each test
  var manaSymbols;
  beforeEach(inject(function ($filter) {
    manaSymbols = $filter('manaSymbols');
  }));

  it('should return the input prefixed with "manaSymbols filter:"', function () {
    var text = 'angularjs';
    expect(manaSymbols(text)).toBe('manaSymbols filter: ' + text);
  });

});
