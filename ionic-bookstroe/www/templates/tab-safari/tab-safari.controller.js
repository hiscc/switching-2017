angular.module('vice').
  controller('SafariCtrl', SafariCtrl);

  SafariCtrl.$inject = ['$scope', '$ionicScrollDelegate', 'Music','$stateParams']
  function SafariCtrl($scope, $ionicScrollDelegate, Music, $stateParams) {

    $scope.scrollTop = function() {
      $ionicScrollDelegate.scrollTop(true)
    }
    // type :  song lyric  comments  detail   artist   album   playlist  mv  djradio  dj detail_dj search
    // br:128000,198000,320000
    // id
    // count
    // start
    // s
    // search_type : 1 单曲 10 专辑 100 歌手 1000 歌单 1002 用户 1004 mv 1006 歌词 1009 主播电台
    $scope.type = 'search';
    $scope.query = $scope.q || 'fade';
    $scope.count = 20;
    $scope.start = 0;
    $scope.br = null;
    $scope.id = null;
    $scope.search_type = null;


    $scope.load = function() {
      $scope.id = null;
      $scope.type = 'search';
      Music.query({'type': $scope.type, 's': $scope.query, 'count': $scope.count,'start': $scope.start, 'br': $scope.br, 'id': $scope.id, 'search_type': $scope.search_type}, function(data) {
        $scope.musicTrain = data.result;
        console.log(data);
      }, function(error) {
        console.log(error);
      }).$promise.finally(function(){
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');
      })
    }
    $scope.load();

    $scope.refresh = function(q) {
      $scope.start = 0;
      $scope.count = 20;
      $scope.query = q || 'fade';
      $scope.load();
    }

    $scope.add = function(q) {
        if ($scope.count >= 100) {
          return false;
        } else {
          $scope.count += 10;
          $scope.query = q || 'fade';
          $scope.load()
        }
    }

    $scope.search = function(q) {
      $scope.query = q;
      $scope.count = 20;
      $scope.load();
    }

    $scope.play = function(id) {
      $scope.type = 'song';
        Music.query({'type': $scope.type, 'id': id}, function(data) {
          $scope.musicurl = data.data[0].url;
        })
      // console.log($scope.musicurl);
    }

  }
