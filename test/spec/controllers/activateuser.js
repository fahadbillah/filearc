'use strict';

describe('Controller: ActivateuserCtrl', function () {

  // load the controller's module
  beforeEach(module('ngApp'));

  var ActivateuserCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ActivateuserCtrl = $controller('ActivateuserCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
