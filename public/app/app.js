var app = angular.module('CleverNote', ['ui.router', 'AppCtrl']);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/404');

        $stateProvider
    .state('home', {
        url: '/',
        templateUrl: 'app/views/home.html',
    })
    .state('signup', {
        url: '/signup',
        templateUrl: 'app/views/userSignup.html',
        controller: 'SignupCtrl'
    })
    .state('login', {
        url: '/login',
        templateUrl: 'app/views/userLogin.html',
        controller: 'LoginCtrl'
    })
    .state('404', {
        url: '/404',
        templateUrl: 'app/views/404.html'
    })
    .state("createNote", {
        url: "/notes/new",
        templateUrl: 'app/views/createNote.html',
        controller: 'NewNotesCtrl'
    })
    .state('note',{
        url: "/notes",
        templateUrl: "app/views/notes.html",
        controller: "NotesCtrl"
    })
    .state('wdi',{
        url: "/WDI",
        templateUrl: "app/views/rooms/wdi.html",
        controller: "NotesCtrl"
    })
    .state('uxdi',{
        url: "/UXDI",
        templateUrl: 'app/views/rooms/uxdi.html',
        controller: "NotesCtrl"
    })
    .state('iosdi',{
        url: '/iOSDI',
        templateUrl: 'app/views/rooms/iosdi.html',
        controller: 'NotesCtrl'
    })
    .state('dsi',{
        url: '/DSI',
        templateUrl: 'app/views/rooms/dsi',
        controller: 'NotesCtrl'
    })
    .state('adi',{
        url: '/ADI',
        templateUrl: 'app/views/rooms/adi.html',
        controller: 'NotesCtrl'
    })
    .state('onenote',{
        url: '/notes/:id',
        templateUrl: "app/views/noteDetail.html",
        controller: 'OneNoteCtrl'
    })
    $locationProvider.html5Mode(true);
    }])
    .config(["$httpProvider", function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor')
}])
