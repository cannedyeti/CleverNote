angular.module('AppCtrl', ['AppServices', 'markdown'])
.controller('SignupCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $scope.user = {
        name: '',
        email: '',
        password: '',
        roomName: ''
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
        name: '',
        email: '',
    };
    $scope.userLogin = function() {
        // to implement
        $http.post("/api/auth", $scope.user).then(function success(res) {
        Auth.saveToken(res.data.token);
        console.log(res.data)
        // Auth.saveUser(res.data);
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
.controller('NewNotesCtrl', ['$scope', '$location', '$http', 'Auth', 'NotesAPI', 'UsersAPI', function($scope, $location, $http, Auth, NotesAPI, UsersAPI){
    $scope.d = function() {
        var today = new Date();
        return today;
    }

    $scope.temp = Auth.currentUser();
    var curUser = $scope.temp.id;
    UsersAPI.getUser(curUser).then(function(user){
        var currentUser = user.data.name;
        var currentRoom = user.data.roomName;
        console.log("User val", user.data.name + " in the", currentRoom)

        $scope.newNote = {
            noteTitle: '',
            noteBody: '',
            noteDate: $scope.d(),
            noteAuthor: currentUser,
            roomName: currentRoom
        }
        
    })
    $scope.addNote = function() {
        // to implement
        console.log($scope.newNote)
        NotesAPI.createNote($scope.newNote)
        .then(function success(res) {
            $location.path('/notes')
        }, function error(err) {
            console.log("Error with create", err)
        })
    };
}])
.controller('NotesCtrl', ['$scope', '$location', '$http', 'Auth', 'NotesAPI', 'UsersAPI', function($scope, $location, $http, Auth, NotesAPI, UsersAPI){
    $scope.notes = [];
    $scope.searchTerm;

    NotesAPI.getAllNotes()
    .then(function success(res) {
        console.log(res)
        $scope.notes = res.data;
    }, function error(err) {
        console.log("Error", err);
    })

    $scope.searchNotes = function() {
        console.log("here")
        NotesAPI.getAllNotes($scope.searchTerm).then(function (res) {
            console.log(res)
            $scope.notes = res.config.data;
        }, function error(err) {
            console.log("Nooo", err)
        })
    }

    $scope.like = function(note){
      console.log("like button pushed")
    }
}])
.controller('OneNoteCtrl', ['$scope', '$location', '$http', 'Auth', 'NotesAPI', '$stateParams', function($scope, $location, $http, Auth, NotesAPI, $stateParams){
    $scope.note = {};

    NotesAPI.getNote($stateParams.id)
    .then(function success(res){
    $scope.note = res.data
    }, function error(err){
        console.log(err)
    })
    $scope.updateNote = function(){
        NotesAPI.updateNote($scope.note).then(function success(res){
            console.log("success", res)
            $location.path("/notes/" + $scope.note._id)
        }, function error(err){
            console.log(err);
        })
    }
    $scope.deleteNote = function(id){
        NotesAPI.deleteNote(id).then(function success(res){
            $location.path("/notes");
        }, function error(err){
            console.log(err);
        });
    };
}])

