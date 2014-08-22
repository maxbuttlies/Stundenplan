app = angular.module "schedule", []
app.controller 'ScheduleController', ($scope,$http, $location,  $filter) ->
	
	$scope.today = new Date()

	$scope.is_lesson = (time, day) ->
		if $scope.is_today day
			console.log typeof  cday + '/' + typeof  day
			datestring = $filter('date')($scope.today, 'MMM dd, yyyy') + ' ' + time 
			lesson_date = new Date(datestring)
			lesson_date_end = new Date(lesson_date.getTime() + 45*60000)
			return lesson_date.getTime() < $scope.today.getTime() and lesson_date_end.getTime() > $scope.today.getTime() 
	

	$scope.is_today = (day) ->
		return $scope.today.getDay() == parseInt(day, 10) 

	$http.get('api/units.json')
	.success (data, status, headers, config) ->
		$scope.units = data

	$http.get('api/days.json')
	.success (data, status, headers, config) ->
		$scope.days = data.days
		$scope.weeks = data.weeks
		$scope.times = data.times
		$scope.week_number = $filter('date')($scope.today, 'w')
 
		$scope.$on '$locationChangeSuccess', ->
	  		$scope.current_week = $location.search().week	  		
  		if $scope.current_week == '' or $scope.current_week == undefined
  			$scope.current_week = $scope.weeks[$scope.week_number % 2]








