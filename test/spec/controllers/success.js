'use strict';

describe('Controller: SuccessCtrl', function () {

  // load the controller's module
  beforeEach(module('ngApp'));

  var SuccessCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SuccessCtrl = $controller('SuccessCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
