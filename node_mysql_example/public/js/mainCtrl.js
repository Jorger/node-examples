angular.module('myApp').controller("mainCtrl",["$scope","$http",function($scope,$http){
		/*
			Obviously there a better way to get and parse the data.
			But for sake of simplicity we will leave it like this for
			now.
		*/
		$scope.users = [];

		$scope.populate = function(){
			$scope.getUsersByName('users');
		};


		$scope.getUsersByName = function (querystr){
			$http.get('/'+querystr)
			.success(function(data){
				$scope.users = data;
			})
			.error(function(xhr,status,statustext){
				console.log("Error ocurred"+xhr);
			});
		};
}]);