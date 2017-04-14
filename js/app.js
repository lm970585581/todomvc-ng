(function(angular) {
	'use strict';
	// Your starting point. Enjoy the ride!
	//应用程序的主要模块
	var myApp = angular.module('app', ['ngRoute', 'app.controllers.main']);
	//创建路由配置
	myApp.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/:status?', {
				controller: 'MainController',
				templateUrl: 'main_tmpl'
			})
			.otherwise({
				redirectTo: '/'
			});
	}]);
})(angular);

