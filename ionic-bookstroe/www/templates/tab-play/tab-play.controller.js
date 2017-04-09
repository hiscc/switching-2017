angular.module('vice').
  controller('PlayCtrl', PlayCtrl);

PlayCtrl.$inject = ['$scope', 'Movies', '$ionicScrollDelegate'];
function PlayCtrl($scope, Movies, $ionicScrollDelegate) {
  $scope.id = 'search';
  $scope.q = '张艺谋';
  $scope.start = 0;
  $scope.count = 20;

  $scope.load = function() {
    Movies.query({'id': $scope.id, 'q': $scope.q, 'start': $scope.start, 'count': $scope.count},
    function(data) {
      $scope.subjects = data.subjects;
      console.log($scope.subjects);
      console.log(data);
    }, function(error) {
      console.log(error);
    }).$promise.finally(function(){
      $scope.$broadcast('scroll.refreshComplete');
      $scope.$broadcast('scroll.infiniteScrollComplete');
    })
  }
  $scope.load();

  $scope.refresh = function() {
    $scope.q = $scope.q? $scope.q : $scope.query;
    $scope.start = 0;
    $scope.load();
  }

  $scope.search = function(search) {
    $scope.start = 0;
    $scope.q = search;
    $scope.load();
    };

  $scope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop(true);
  }

  }
