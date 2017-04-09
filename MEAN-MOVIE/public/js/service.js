angular.module('App.service', [])
.factory('Movie', function($resource) {
  var $url = '/movies/:id';
  return $resource($url, {id: '@_id'}, {
    update: {
      method: 'PUT'
    }
  });
})
.service('popupService', function($window) {
    this.showPopup = function(message) {
      return $window.confirm(message);
    }
  });
