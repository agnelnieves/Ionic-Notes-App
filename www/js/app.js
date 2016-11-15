(function() {

  // Ionic Starter App

  // angular.module is a global place for creating, registering and retrieving Angular modules
  // 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
  // the 2nd parameter is an array of 'requires'
  var app = angular.module('myNotes', ['ionic', 'mynotes.notestore']);


  // Shows in which state each view relies
  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('list', {
      url: '/list',
      templateUrl: 'templates/list.html'
    });
    $stateProvider.state('add', {
      url: '/add',
      templateUrl: 'templates/edit.html',
      controller: 'AddCtrl'
    });
    $stateProvider.state('edit', {
      url: '/edit/:noteId',
      templateUrl: 'templates/edit.html',
      controller: 'EditCtrl'
    });

    // If it doesnt match redirects to list
    $urlRouterProvider.otherwise('/list');
  });

  // This controller shows the note objects
  app.controller('ListCtrl', function($scope, NoteStore) {
    // array
    $scope.notes = NoteStore.list();
  });

  //This controller adds a new note
  app.controller('AddCtrl', function($scope, $state, NoteStore) {
    $scope.note = {
      id: new Date().getTime().toString(),
      title: '',
      description: ''
    };
    $scope.save = function() {
      NoteStore.create($scope.note);
      $state.go('list');
    };
  });

  //This controller edits a note
  app.controller('EditCtrl', function($scope, $state) {
    $scope.note = angular.copy(NoteStore.get($state.params.noteId));
    $scope.save = function() {
      NoteStore.update($scope.note);
      $state.go('list');
    };
  });

  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });
}());
