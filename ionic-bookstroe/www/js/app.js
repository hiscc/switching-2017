// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('vice', ['ionic', 'vice.api', 'vice.books'])

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);

		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
})
.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}])

.config(function($stateProvider, $urlRouterProvider) {

	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider

		.state('tab', {
		url: '/tab',
		abstract: true,
		templateUrl: 'templates/tabs.html'
	})

	.state('tab.home', {
		url: '/home',
		params: {
			id: null
		},
		views: {
			'tab-home': {
				templateUrl: 'templates/tab-home/tab-home.html',
				controller: 'HomeCtrl'
			}
		}
	})

	.state('tab.detail', {
		url: '/book/:id',
		views: {
			'tab-home': {
				templateUrl: 'templates/book-detail/book-detail.html',
				controller: 'BookdetailCtrl'
			}
		}
	})

	.state('tab.play', {
		url: '/play',
		views: {
			'tab-play': {
				templateUrl: 'templates/tab-play/tab-play.html',
				controller: 'PlayCtrl'
			}
		}
	})

	.state('tab.safari', {
		url: '/safari',
		views: {
			'tab-safari': {
				templateUrl: 'templates/tab-safari/tab-safari.html',
				controller: 'SafariCtrl'
			}
		}
	})

	.state('tab.me', {
			url: '/me',
			views: {
				'tab-me': {
					templateUrl: 'templates/tab-me/tab-me.html',
					controller: 'MeCtrl'
				}
			}
		});


	$urlRouterProvider.otherwise('/tab/home');

});
