angular.module('vice').
  controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = ['$scope', 'Books','$ionicScrollDelegate', '$stateParams'];
function HomeCtrl($scope,  Books, $ionicScrollDelegate, $stateParams) {
  $scope.query =  $stateParams.id || 'javascript' ;
  $scope.start = 0;
  $scope.count = 30;

  $scope.load = function() {
    Books.query({'q': $scope.query, 'start': $scope.start, 'count': $scope.count}, function(data){
      $scope.books = data;
      console.log(data);
    }, function(error){
      console.log(error);
    }).$promise.finally(function() {
          $scope.$broadcast('scroll.refreshComplete');
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
  }
  $scope.load();

  $scope.add = function() {
    if ($scope.count > 100) {
      return false;
    } else {
      $scope.query = $stateParams.id || $scope.query;
      $scope.count += 20;
      $scope.load();
      console.log($scope.q);
    }

  }
  $scope.refresh = function() {
    $scope.start = 0;
    $scope.query =  $stateParams.id || $scope.query;
    $scope.load();
  }
  $scope.search = function(lang) {
    $scope.start = 0;
    $scope.count = 30;
    $scope.query = lang;
    $scope.load();
    };

  $scope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop(true);
  }

  }
