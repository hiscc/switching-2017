angular.module('App', ['ui.router', 'ngResource', 'App.controllers', 'App.service'])
  .config(function ($stateProvider, $httpProvider) {
    $stateProvider.state('movies', {
      url: '/movies',
      templateUrl: 'public/movies.html',
      controller: function( $scope, $state, popupService, $window, Movie, $location) {
        $scope.movies = Movie.query();
        $scope.deleteMovie = function(movie) {
          if (popupService.showPopup('删除？')) {
            movie.$delete();
            $window.location.href = '';
          }
        };
      }
    })
    .state('viewMovie', {
      url: '/movies/:id/view',
      templateUrl: 'public/movie-view.html',
      controller: function($scope, $stateParams, Movie) {
        $scope.movie = Movie.get({id: $stateParams.id});
      }
    })
    .state('newMovie', {
      url: '/movies/new',
      templateUrl: 'public/movie-add.html',
      controller: function($scope, $state, $stateParams, Movie) {
        $scope.movie = new Movie();
        $scope.addMovie = function () {
          $scope.movie.$save();
          $state.go('movies');
        }
      }
    })
    .state('editMovie', {
      url: '/movies/:id/edit',
      templateUrl: 'public/movie-edit.html',
      controller: function($scope, $state, $stateParams, Movie) {
        $scope.updateMovie = function() {
          $scope.movie.$update();
          $state.go('movies')
        };
        $scope.loadMovie = function() {
          $scope.movie = Movie.get({id: $stateParams.id});
        };
        $scope.loadMovie();
      }
    });
  })
  .run(function($state) {
    $state.go('movies');
  });
