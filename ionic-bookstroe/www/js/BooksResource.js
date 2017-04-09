// 放置ngResource服务，对应后端的api
angular.module('vice.books', ['ngResource']).
  factory('Books', Books).
  factory('BookId', BookId).
  factory('BookAnnotations', BookAnnotations).
  factory('Movies', Movies).
  factory('Music', Music);

  Books.$inject = ['$resource'];
  function Books($resource) {
    return $resource('/api/books/', {},
    {'query': {method: 'GET'}})
  }

  BookId.$inject = ['$resource'];
  function BookId($resource) {
    return $resource('/api/book/:id', {id: '@id'}, {
      'query': {method: 'GET'}
    })
  }

  BookAnnotations.$inject = ['$resource'];
  function BookAnnotations($resource) {
    return $resource('/self/book/:id', {id: '@id'}, {
      'query': {method: 'GET'}
    })
  }

  Movies.$inject = ['$resource'];
  function Movies($resource) {
    return $resource('/movies/:id',{id: '@id' },
    {'query': {method: 'GET'}, isArray: true})
  }

  Music.$inject = ['$resource'];
  function Music($resource) {
    return $resource('/music',{},
    {'query': {method: 'GET'}, isArray: true})
  }
