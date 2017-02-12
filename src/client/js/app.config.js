
(function() {
  'use strict';

  angular.module('app.config', [])
    .config(config);

    config.$inject = [
      '$stateProvider',
      '$urlRouterProvider',
      '$locationProvider'
    ];

    function config($stateProvider, $urlRouterProvider, $locationProvider) {

      $locationProvider.html5Mode(true);

      $stateProvider
        .state({
          name: 'home',
          url: '/',
          component: 'main'
        })
        .state({
          name: 'register',
          url: '/register',
          component: 'register'
        })
        .state({
          name: 'login',
          url: '/login',
          component: 'login',
        })
        .state({
          name: 'dashboard',
          url: '/dashboard',
          component: 'dashboard',
          onEnter: authenticate
        });
        $urlRouterProvider.otherwise('/login');
      }

      function authenticate(dashboardService, $location) {
        const token = localStorage.getItem('token');
        if(token) {
          dashboardService.ensureAuthenticated(token)
          .then((response) => { dashboardService.current_user = response.data; });
        } else {
          $location.path('login');
        }
      }
}());
