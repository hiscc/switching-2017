angular.module('vice').
  controller('BookdetailCtrl', BookdetailCtrl);

  BookdetailCtrl.$inject = ['$scope', 'BookId', '$stateParams', 'BookAnnotations', '$ionicScrollDelegate'];
  function BookdetailCtrl($scope, BookId, $stateParams, BookAnnotations, $ionicScrollDelegate) {
    BookId.get({id: $stateParams.id}, function(data) {
      $scope.book = data;
    }, function(error) {
      console.log(error);
    });

    $scope.id = 'search';
    $scope.q = $stateParams.tag;
    $scope.start = 0;
    $scope.count = 30;

    $scope.getAnnotations = function() {
      BookAnnotations.query({id: $stateParams.id, 'count': $scope.count, 'start': $scope.start}, function(data) {
        $scope.annotations = data;
        console.log(data);
      }, function(error) {
        console.log(error);
      }).$promise.finally(function() {
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');
      })
    }
    $scope.getAnnotations();

    $scope.add = function() {
        $scope.count += 10;
        $scope.getAnnotations();
    }

    $scope.refresh = function() {
      $scope.start = 0;
      $scope.getAnnotations();
    }

    $scope.scrollTop = function() {
      $ionicScrollDelegate.scrollTop(true);
    }

  }
