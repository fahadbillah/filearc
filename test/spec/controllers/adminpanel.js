'use strict';

describe('Controller: AdminpanelCtrl', function () {

  // load the controller's module
  beforeEach(module('ngApp'));

  var AdminpanelCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminpanelCtrl = $controller('AdminpanelCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
