angular.module('AppServices', ['ngResource'])
.factory("Auth", ["$window", function($window) {
    return {
        saveToken: function(token) {
        $window.localStorage['user-token'] = token;
        },
        removeToken: function() {
        $window.localStorage.removeItem('user-token');
        },
        getToken: function() {
        return $window.localStorage['user-token'];
        },
        isLoggedIn: function() {
        var token = this.getToken();
        return token ? true : false;
        },
        currentUser: function() {
        if(this.isLoggedIn()){
            var token = this.getToken();

            try {
            // vuln code
            var payload = JSON.parse($window.atob(token.split(".")[1]));
            return payload;
            }
            catch (err){
            // graceful err handling
            console.log(err)
            return false;
            }
        } else {
            return false;
        }
        }
    }
}])
.factory("AuthInterceptor", ["Auth", function(Auth) {
    return {
        request: function(config) {
        var token = Auth.getToken();
        if(token) {
            config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
        }
    }
}])
.factory('NotesAPI', ['$http', '$location', function($http, $location){
    return {
        createNote: function(note) {
            return $http.post('/api/notes', note)
        },
        getAllNotes: function(){
            return $http.get("/api/notes/");
        },
        getNote: function(id){
            return $http.get("/api/notes/" + id);
        },
        deleteNote: function(id) {
            return $http.delete("/api/notes/" + id)
            .then(function success(res) {
                console.log("nice delete!", res);
                return res.data;
            }, function error(err) {
                console.log("There was an error!", err);
                return null;
            })
        },
        updateNote: function(note) {
            return $http.put("api/notes/" + note._id, note)
            .then(function success(res){
                return res.data
            }, function error (err){
                return null;
            });
        }    
    }
}])
<<<<<<< HEAD
.factory("UsersAPI", ["$http", function($http) {
    return {
        getUser: function(id) {
            console.log('here i am', id)
            console.log($http.get('api/users/' + id))
            return $http.get('api/users/' + id)
        }
    }
}])
=======
>>>>>>> 1c7b010be754057d617f7a6e9ab501e1e183ef7c
