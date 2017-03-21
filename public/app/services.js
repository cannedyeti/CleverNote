angular.module('AppServices', ['ngResource'])
.factory("Auth", ["$window", function($window) {
    return {
        saveToken: function(token) {
        $window.localStorage['secretrecipes-token'] = token;
        },
        removeToken: function() {
        $window.localStorage.removeItem('secretrecipes-token');
        },
        getToken: function() {
        return $window.localStorage['secretrecipes-token'];
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
            console.log("payload decoded: " + payload);
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
<<<<<<< HEAD
<<<<<<< HEAD
            return $http.post('/api/notes', note)
        }
=======
            console.log("This is whats in the db", note)
=======
>>>>>>> cd6d120343a79c0bc4a8a8958e18489c8f451f5e
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
>>>>>>> 0faf7dde23fb37724c867f0eee6b4feb54b67b43
    }
}])
