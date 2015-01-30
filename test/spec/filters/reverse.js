'use strict';

describe('Filter: reverse', function () {

  // load the filter's module
  beforeEach(module('mtgEmblemsApp'));

  // initialize a new instance of the filter before each test
  var reverse;
  beforeEach(inject(function ($filter) {
    reverse = $filter('reverse');
  }));

  it('should leave non-arrays as is:"', function () {
    var text = 'angularjs';
    expect(reverse(text)).toBe(text);
  });

  it('should reverse arrays:"', function () {
    var array = [1, 2, 3];
    expect(reverse(array)).toEqual([3, 2, 1]);
  });
});
