'use strict';

describe('Controller: MainCtrl', function () {


  var MainCtrl,
    scope,
    httpBackend;

    // load the controller's module
  beforeEach(module('mtgEmblemsApp'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
    httpBackend = $httpBackend;
    jasmine.getJSONFixtures().fixturesPath='base/test/fixtures';
    httpBackend.whenGET('./data/emblems.json').respond(getJSONFixture('emblems.json'));
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('getRandomCard should return something', function () {
    httpBackend.expectGET('./data/emblems.json');
    httpBackend.flush();
    expect(scope.getRandomCard()).toBeDefined();
  });

  it('should add an emblem when the next button is clicked', function () {
    httpBackend.expectGET('./data/emblems.json');
    httpBackend.flush();
    scope.next(false, false);
    expect(scope.show_emblems.length).toBe(1);
  });

  it('should empty all emblems when the reset button is clicked', function () {
    httpBackend.expectGET('./data/emblems.json');
    httpBackend.flush();
    scope.reset();
    expect(scope.show_emblems.length).toBe(0);
  });
});
