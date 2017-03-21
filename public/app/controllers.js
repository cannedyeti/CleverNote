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
.controller('NewNotesCtrl', ['$scope', '$location', '$http', 'Auth', 'NotesAPI', function($scope, $location, $http, Auth, NotesAPI){
    $scope.d = function() {
        var today = new Date();
        return today;
    }
    $scope.currentUser = Auth.currentUser();
    console.log($scope.currentUser)

    $scope.newNote = {
        noteTitle: '',
        noteBody: '',
        noteDate: $scope.d(),
        noteAuthor: $scope.currentUser
    }
    $scope.addNote = function() {
        // to implement
        console.log("This is what should be in the console:", $scope.newNote)
        NotesAPI.createNote($scope.newNote)
        .then(function success(res) {
            console.log("this is the res:", res.config.data)
            $location.path('/notes')
        }, function error(err) {
            console.log("Error with create", err)
        })
    };
}])
.controller('NotesCtrl', ['$scope', '$location', '$http', 'Auth', 'NotesAPI', function($scope, $location, $http, Auth, NotesAPI){
    $scope.notes = [];
    $scope.searchTerm;

    NotesAPI.getAllNotes()
    .then(function success(res) {
        console.log(res)
        $scope.notes = res.data;
    }, function error(err) {
        console.log("Error", err);
    })

    // $scope.searchNotes = function() {
    //     console.log("here")
    //     NotesAPI.getAllNotes($scope.searchTerm).then(function (res) {
    //         console.log(res)
    //         $scope.notes = res.config.data;
    //     }, function error(err) {
    //         console.log("Nooo", err)
    //     })
    // }
}]);
