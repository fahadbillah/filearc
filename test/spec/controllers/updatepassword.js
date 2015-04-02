'use strict';

describe('Controller: UpdatepasswordCtrl', function () {

  // load the controller's module
  beforeEach(module('ngApp'));

  var UpdatepasswordCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UpdatepasswordCtrl = $controller('UpdatepasswordCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
