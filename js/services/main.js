(function(angular) {
	'use strict'
	angular.module('app.services.main', []).
	service('MainService', ['$window', function($window) {

		var storage = $window.localStorage;
		var todos = storage['my_todo_list'] ? JSON.parse(storage['my_todo_list']) : [];
		//				获取id
		function getId() {
			var id = Math.random();
			for(var i = 0; i <todos.length; i++) {
				if(todos[i].id === id) {
					getId();
					break;
				}
			}
			return id;
		}

		this.save = function() {
			storage['my_todo_list'] = JSON.stringify(todos);
		};

		// 控制私有字段的访问权限
		this.get = function() {
			return todos;
		};

		// 业务逻辑都必须出现在服务中（专门定义业务逻辑）
		//添加数据
		this.add = function(text) {
			todos.push({
				id: getId(),
				// 由于$scope.text是双向绑定的，add同时肯定可以同他拿到界面上的输入
				text: text,
				completed: false
			});
			this.save();
		};
		//删除操作
		this.remove = function(id) {
			for(var i = 0; i < todos.length; i++) {
				if(todos[i].id === id) {
					todos.splice(i, 1);
					break;
				}
			}
			this.save();
		};

		// 清空已完成
		this.clearCompleted = function() {
			var result = [];
			for(var i = 0; i < todos.length; i++) {
				if(!todos[i].completed) {
					result.push(todos[i]);
				}
			}
			todos = result;
			this.save();
			// 此时我们将todos指向了一个新的地址
			return todos;
		};

		// 是否有已经完成的
		this.existCompleted = function() {
			for(var i = 0; i < todos.length; i++) {
				if(todos[i].completed) {
					return true;
				}
			}
			return false;
		};
	}]);
})(angular)