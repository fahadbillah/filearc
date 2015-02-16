'use strict';

describe('Controller: FiledetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('ngApp'));

  var FiledetailsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FiledetailsCtrl = $controller('FiledetailsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
