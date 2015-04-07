module.exports = function($scope,$http){
	$scope.users = [];
	var userstr = 'users';

	$scope.populate = function(){
		$scope.getUsersByName(userstr);
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
}

