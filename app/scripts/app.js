'use strict';

angular.module('proyectoClinicaApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
  'ngRoute',
  'ngTouch',
  'ngGrid',
  'angularModalService',
  'ui.tree'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/pregunta', {
        templateUrl: 'views/pregunta.html',
        controller: 'PreguntaCtrl'
      })
      .when('/crearpregunta', {
        templateUrl: 'views/crearpregunta.html',
        controller: 'PreguntaCtrl'
      })
      .when('/respuesta', {
        templateUrl: 'views/respuesta.html',
        controller: 'PreguntaCtrl'
      })
      .when('/cuestionario', {
        templateUrl: 'views/cuestionario.html',
        controller: 'PreguntaCtrl'
      })
      .when('/preguntaestudiante', {
        templateUrl: 'views/preguntaestudiante.html',
        controller: 'PreguntaestudianteCtrl'
      })
      .when('/verpreguntas', {
        templateUrl: 'views/verpreguntas.html',
        controller: 'PreguntaestudianteCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
