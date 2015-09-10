'use strict';

angular.module('proyectoClinicaApp')
  .controller('PreguntaCtrl', function ($scope, $http) {
    $http.get('/api/pregunta').success(function(listaPregunta) {
      $scope.listaPreguntas = listaPregunta;
    });

    //$scope.preguntarespuesta = listaPreguntas[listaPreguntas.length - 1];
    //$scope.opcionesrespuesta = preguntarespuesta.respuestas;

    $scope.seleccion = [];
    $scope.pregunta =
    {
      enunciado: "",
      opciones: [],
      respuestas: []
    };

    $scope.guardar = function (preguntaIngreso){
      $http({
        method: 'POST',
        url: '/api/pregunta/guardar',
        params:
        {
          enunciado: preguntaIngreso.enunciado,
          opciones: arrayOpciones,
          respuestas: arrayRespuestas
        }
      }).success(function(data) {
        //alert("Pregunta guardado con éxito.");
        $scope.update();
      }).error(function() {
        alert("Error al guardar el pregunta.");
      });
    };

    var removeTemplate =
      '<button type="button" class="btn btn-default btn-sm" data-toggle="modal" data-target="#editarPreguntaModal" ng-click="indexPreguntaEditar($index)"> ' +
      '<span class="glyphicon glyphicon-edit" aria-hidden="true"></span> </button>' +
      '<button type="button" class="btn btn-default btn-sm" data-toggle="modal" data-target="#eliminarPreguntaModal" ng-click="indexPregunta($index)"> ' +
      '<span class="glyphicon glyphicon-trash" aria-hidden="true"></span> </button>';

    $scope.listadoPreguntas = {
      data: 'listaPreguntas',
      showFooter: true,
      selectedItems: $scope.seleccion,
      rowHeight: 50,
      headerRowHeight: 30,
      columnDefs: [
        {field: 'enunciado', displayName: 'Enunciado', width: '85%'},
        {field: 'remove', displayName:'Acción', cellTemplate: removeTemplate, width: '15%'}
      ],
      enableRowSelection: true,
      enableCellSelection: true,
      showGroupPanel: false,
      enableCellEdit: false,
      showSelectionCheckbox: false,
      enableColumnResize: true,
      enableColumnReordering: true,
      enableRowReordering: true,
      multiSelect: false,
      enableHighlighting: true,
      noKeyboardNavigation: true,
      afterSelectionChange: function (theRow, evt) {
        $scope.pregunta.id = theRow.entity.id;
        $scope.pregunta.enunciado = theRow.entity.enunciado;
      }
    };

    //Función para identificar la fila afectada
    $scope.indexPregunta = function(){
      $scope.objetoFila = this.row.rowIndex;
      console.log($scope.seleccion);
    };

    //Funcion que permite identificar la fila que esta siendo afectada con un click (en la fila o el boton del edit) para la eliminacion
    // Su index dentro de la tabla del ng-grid en la vista
    $scope.indexPreguntaEditar = function(){
      $scope.objetoFila = this.row.rowIndex;
      console.log($scope.seleccion[0]);
    };

    //Eliminar un registro
    $scope.removeRow = function() {
      $scope.eliminarPregunta($scope.seleccion[0].id);
      $scope.listadoPreguntas.selectItem($scope.objetoFila, false);
      $scope.listaPreguntas.splice($scope.objetoFila, 1);

    };

    $scope.eliminarPregunta = function(id){
      $http({
        method: 'POST',
        url: '/api/pregunta/eliminar',
        params: {
          _id: id
        }
      }).
        success(function(data) {
          //alert("Eliminado exitosamente.");
          $scope.update();
        }).
        error(function() {
          alert("Error al eliminar el registro.")
        });
    };

    //Editar Pregunta
    $scope.editar = function(pregunta){
      $http({
        method:'POST',
        url: '/api/pregunta/editar/',
        params:{
          id: pregunta.id,
          enunciado: pregunta.enunciado,
          opciones: [],
          respuestas: []
        }
      }).success(function(data){
        $scope.update();
        //alert("Registro actualizado con éxito.")
      }).error(function(){
        console.log("Error en el controller pregunta");
      });
    };

    $scope.listarespuesta = [];
    $scope.item1 = false;
    $scope.item2 = false;
    $scope.item3 = false;
    $scope.item4 = false;
    $scope.item5 = false;
    $scope.item6 = false;
    $scope.item7 = false;
    $scope.item8 = false;
    $scope.item9 = false;
    $scope.item10 = false;
    //Agregar Respuestas
    $scope.guardarRespuestas = function(pregunta){
      var cont = 0;
      var arrayRes = pregunta.respuestas;
      var fin = pregunta.respuestas.length;
      while(cont < fin)
      {
        if (cont == 0 && this.item1 == true) {
          arrayRes[cont] += 1;
        }
        if (cont == 1 && this.item2 == true) {
          arrayRes[cont] += 1;
        }
        if (cont == 2 && this.item3 == true) {
          arrayRes[cont] += 1;
        }
        if (cont == 3 && this.item4 == true) {
          arrayRes[cont] += 1;
        }
        if (cont == 4 && this.item5 == true) {
          arrayRes[cont] += 1;
        }
        if (cont == 5 && this.item6 == true) {
          arrayRes[cont] += 1;
        }
        if (cont == 6 && this.item7 == true) {
          arrayRes[cont] += 1;
        }
        if (cont == 7 && this.item8 == true) {
          arrayRes[cont] += 1;
        }
        if (cont == 8 && this.item9 == true) {
          arrayRes[cont] += 1;
        }
        if (cont == 9 && this.item10 == true) {
          arrayRes[cont] += 1;
        }
        cont = cont + 1;
      }
      $http({
        method:'POST',
        url: '/api/pregunta/editar/',
        params:{
          id: pregunta.id,
          respuestas: arrayRes
        }
      }).success(function(data){
        $scope.update();
        console.log("inside guardarRespuesta");
        //alert("Registro actualizado con éxito.")
      }).error(function(){
        console.log("Error en el controller pregunta !!!!");
      });
    };



    //Funcion para traer los datos actualizados
    $scope.update = function(){
      $http.get('/api/pregunta').success(function(listaPregunta) {
        $scope.listaPreguntas = listaPregunta;
      });
    };

    var arrayOpciones= [];
    var arrayRespuestas = [];

    $scope.conjuntoOpciones = arrayOpciones;
    $scope.conjuntoRespuestas = arrayRespuestas;
    $scope.contador = 0;

    $scope.addOpcionRespuesta = function(respuestaNueva){
      arrayOpciones.push(
        respuestaNueva.descripcion
      );
      arrayRespuestas.push(
        0
      );
    };

  });
