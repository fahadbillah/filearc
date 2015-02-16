'use strict';

describe('Service: baseURL', function () {

  // load the service's module
  beforeEach(module('ngApp'));

  // instantiate service
  var baseURL;
  beforeEach(inject(function (_baseURL_) {
    baseURL = _baseURL_;
  }));

  it('should do something', function () {
    expect(!!baseURL).toBe(true);
  });

});
