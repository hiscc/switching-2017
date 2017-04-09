var bookList = 'https://api.douban.com/v2/book/search?q=javascript&fields=id,title,rating&count='
angular.module('vice.api', ['ionic']).
  factory('LSFactory', LSFactory).
  factory('BooksFactory', BooksFactory);

  function LSFactory() {
    var LSAPI = {

      clear: function() {
        return localStorage.clear();
      },

      get: function(key) {
        return JSON.parse(localStrage.getItem(key));
      },

      set: function(key, data) {
        return localStorage.setItem(key, JSON.stringify(data));
      },

      delete: function(key) {
        return localStorage.removeItem(key);
      },

      getAll: function() {
        var books = [];
        var items = Object.keys(localStorage);

        for (var i = 0; i < items.length; i++) {
          // if (items[i] !== 'user' || items[i] !== 'token') {
            books.push(JSON.parse(localStorage[items[i]]));
          // }
        }

        return books;
      }
    };

    return LSAPI;

  }

  BooksFactory.$inject = ['$http'];
  function BooksFactory($http) {
    var pageCount = 30;
    var API = {
      get: function(page) {
        return $http.get(bookList + pageCount + '&start=' + page * pageCount)
      }
    };

    return API;

  }
