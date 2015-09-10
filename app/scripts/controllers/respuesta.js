'use strict';

angular.module('proyectoClinicaApp')
  .controller('RespuestaCtrl', function ($scope, $http) {
    $http.get('/api/pregunta').success(function(listaPregunta) {
      $scope.listaPreguntasRes = listaPregunta;
    });

    $scope.pregunta =
    {
      enunciado: "",
      respuestas: []
    };

    $scope.guardar = function (respuestaIngreso){
      $http({
        method: 'POST',
        url: '/api/pregunta/guardar',
        params:
        {
          enunciado: respuestaIngreso
        }
      }).success(function(data) {
        //alert("Pregunta guardado con éxito.");
        $scope.update();
      }).error(function() {
        alert("Error al guardar el pregunta.");
      });
    };

    $scope.ultimapregunta = function(){
      $http.get('/api/pregunta').success(function(listaPreguntaRes) {
        $scope.listaPreguntasRes = listaPreguntaRes;
      });
    };

  });
