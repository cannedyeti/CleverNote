angular.module('AppCtrl', ['AppServices'])
.controller('SignupCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $scope.user = {
        email: '',
        password: ''
    };
    $scope.userSignup = function() {
        // to implement
        $http.post('/api/users', $scope.user).then(function success(res) {
        $state.go("home");
        }, function error(err) {
        console.log("Error", err)
        })
    };
}])
.controller('LoginCtrl', ['$scope', '$http', '$state', 'Auth', function($scope, $http, $state, Auth) {
    $scope.user = {
        email: '',
        password: ''
    };
    $scope.userLogin = function() {
        // to implement
        $http.post("/api/auth", $scope.user).then(function success(res) {
        Auth.saveToken(res.data.token);
        $state.go("home")
        }, function error(err) {
            console.log("Yo dawg")
        })
        }
}])
.controller('NavCtrl', ['$scope', 'Auth', '$location', function($scope, Auth, $location) {
  $scope.isLoggedIn = function() {
    return Auth.isLoggedIn();
  }
  $scope.logout = function() {
    // to implement
    console.log("Before Logout", Auth.getToken());
    Auth.removeToken();
    console.log("After Logout", Auth.getToken());
    $location.path("/login");
  };
}])
.controller('NotesCtrl', ['$scope', '$location', '$http', function($scope, $location, $http){
    $scope.d = function() {
        var today = new Date();
        return today;
    }
    $scope.date = $scope.d;
    $scope.notes = {
        title: '',
        body: '',
        date: $scope.d(),
        author: ''
    }
    $scope.createNote = function() {
        // to implement
        $http.post('/api/notes', $scope.notes).then(function success(res) {
            console.log(res.config.data)
            $location.path("/");
        }, function error(err) {
            console.log("Error", err)
        })
    };

}])
