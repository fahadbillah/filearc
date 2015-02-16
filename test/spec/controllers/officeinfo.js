'use strict';

describe('Controller: OfficeinfoCtrl', function () {

  // load the controller's module
  beforeEach(module('ngApp'));

  var OfficeinfoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OfficeinfoCtrl = $controller('OfficeinfoCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
