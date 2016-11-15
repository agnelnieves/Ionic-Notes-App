(function(){

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic']);


// Shows in which state each view relies
app.config(function($stateProvider, $urlRouterProvider)
{
  $stateProvider.state('list', {
    url:'/list',
    templateUrl:'templates/list.html'
  });
  $stateProvider.state('add', {
    url:'/add',
    templateUrl:'templates/edit.html',
    controller: 'AddCtrl'
  });
  $stateProvider.state('edit', {
    url:'/edit/:noteId',
    templateUrl:'templates/edit.html',
    controller: 'EditCtrl'
  });

  // If it doesnt match redirects to list
  $urlRouterProvider.otherwise('/list');
});

var notes=[];

//getNOte function
function getNote(noteId){
  for (var i=0; i< notes.length; i++){
    if (notes[i].id === noteId){
      return notes[i];
    }
  }
  return undefined;
}

//Update note function
function updateNote(note){
  for (var i=0; i< notes.length; i++){
    if (notes[i].id === note.id){
      notes[i] = note;
      return;
    }
  }
  return undefined;
}

function createNote(note){
  notes.push(note);
}

// This controller shows the note objects
app.controller('ListCtrl', function ($scope){
  // array
  $scope.notes = notes;
});

//This controller adds a new note
app.controller('AddCtrl', function($scope, $state){
  $scope.note = {
    id: new Date().getTime().toString(),
    title:'',
    description: ''
  };
  $scope.save = function(){
    createNote($scope.note);
    $state.go('list');
  };
});

//This controller edits a note
app.controller('EditCtrl', function($scope, $state){
  $scope.note = angular.copy(getNote($state.params.noteId));
  $scope.save = function(){
    updateNote($scope.note);
    $state.go('list');
  };
});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
}());
