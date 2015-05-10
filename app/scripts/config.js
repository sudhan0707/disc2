/**
 * INSPINIA - Responsive Admin Theme
 * Copyright 2014 Webapplayers.com
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written stat for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/index/ibx");

    $stateProvider

        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "views/common/content.html",
        })
        .state('index.ibx', {
            url: "/ibx",
            templateUrl: "views/main.html",
            data: { pageTitle: 'IBX Risk Profile' }
        })
        .state('index.customer', {
            url: "/customer",
            templateUrl: "views/minor.html",
            data: { pageTitle: 'Customer Risk Profile' }
        })
}
angular
    .module('disc')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });