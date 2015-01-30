'use strict';

describe('Controller: HostCtrl', function () {

  // load the controller's module
  beforeEach(module('mtgEmblemsApp'));

  var HostCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HostCtrl = $controller('HostCtrl', {
      $scope: scope
    });
  }));

});
