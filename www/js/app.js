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
  $stateProvider.state('edit', {
    url:'/edit/:noteId',
    templateUrl:'templates/edit.html'
  });

  // If it doesnt match redirects to list
  $urlRouterProvider.otherwise('/list');
});

var notes=[
  {
    // javascript object1
      id:'1',
    title:'First Note',
    description: 'This is my first note.'
  },
  {
    // javascript object2
      id:'2',
    title:'Second Note',
    description: 'This is my second note.'
  }
];

function getNote(noteId){
  for (var i=0; i< notes.length; i++){
    if (notes[i].id === noteId){
      return notes[i];
    }
  }
  return undefined;
}

app.controller('ListCtrl', function ($scope){
  // array
  $scope.notes = notes;
});

app.controller('EditCtrl', function($scope, $state){
  $scope.note = getNote($state.params.noteId);
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
