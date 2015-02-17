'use strict';

describe('Filter: italicize', function () {

  // load the filter's module
  beforeEach(module('mtgEmblemsApp'));

  // initialize a new instance of the filter before each test
  var italicize;
  beforeEach(inject(function ($filter) {
    italicize = $filter('italicize');
  }));

  it('should return words between asteriks as italics"', function () {
    var text = '*angularjs*';
    expect(italicize(text).$$unwrapTrustedValue()).toBe('<span style="font-style: italic">angularjs</span>');
  });

});
