'use strict';

describe('Controller: RespuestaCtrl', function () {

  // load the controller's module
  beforeEach(module('proyectoAulaApp'));

  var RespuestaCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/awesomeThings')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma']);
    scope = $rootScope.$new();
    RespuestaCtrl = $controller('RespuestaCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings).toBeUndefined();
    $httpBackend.flush();
    expect(scope.awesomeThings.length).toBe(3);
  });
});