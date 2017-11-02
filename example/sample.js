(function (angular) {
    'use strict';

    var module = angular.module('sample', ['ngRoute', 'custom-ax-dt-picker']);

    module.config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/', {
                    controller:'sample',
                    templateUrl:'sample.html'
                })
                .otherwise({
                    redirectTo:'/'
                });
        }
    ]);

    module.run([
        function () {
        }
    ]);

    module.controller('sample', [
        '$scope',
        function ($scope) {
//            $scope.options = { hideTimeUnit: true };
            $scope.rangeDictionary = [
                { label: 'Last 10 Minutes', duration: { unit: 'minutes', value: 10 }},
                { label: 'Last Hour', duration: { unit: 'hour', value: 1 }},
                { label: 'Last 24 Hours', duration: { unit: 'day', value: 1 }},
                { label: 'Yesterday', duration: { unit: 'day', value: 1, offset: 1 }},
                { label: 'Last 7 Days', duration: { unit: 'week', value: 1 }},
                { label: 'Custom Range', custom: 'true' }
            ];
            $scope.comboButton = true;
            $scope.configuring = ($scope.expandConfigure) ?  true : false;
            // Options for initial setup of date time picker in order of precedence
            // 1. Label
            //const label = 'Last 24 Hours';
            //$scope.setRange = { label: label };

            // 2. Duration + from
            //const duration = { unit: 'hours', value: 4, label: '4 hours' };
            //const from = moment().subtract(1, 'days').valueOf();
            //$scope.setRange = { duration: duration, from: from };

            // 3. Duration
            //const duration = { unit: 'weeks', value: 2 };
            //$scope.setRange = { duration: duration };


            // 4. From + to > This will only work on absolute mode
//            const from = moment().subtract(7, 'days').subtract(1, 'hours').valueOf();
//            const to = moment().subtract(1, 'hours').valueOf();
//            $scope.setRange = { from: from, to: to };

            // Default (if nothing is provided or if initial setup fails, for example, giving a label that does not match any option.
            // First option of the dictionary will be selected.
        }
    ]);
} (angular));
