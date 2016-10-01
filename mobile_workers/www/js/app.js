// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','starter.services', 'ngCordova', 'ngCordovaOauth', 'ngStorage'])

  .run(function ($ionicPlatform, $rootScope, $state,$localStorage) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }

      $rootScope.startTracking = function () {

        var callbackFn = function (location) {
          console.log('[js] BackgroundGeolocation callback:  ' + location.latitude + ',' + location.longitude);
          var latlng = {latitude: location.latitude, longitude: location.longitude};
          $rootScope.$emit('geolocationUpdated', new google.maps.LatLng(location.latitude, location.longitude));

          user.getUser().then(function (data) {
            var now = new Date();

            locationsSave = {
              userEmail: data.email,
              latitude: location.latitude,
              longitude: location.longitude,
              date: new Date()
            };
            geolocationFactory.save(locationsSave);
          }, function (error) {
            console.log("error in getting user!");
          });


          backgroundGeolocation.finish();

        };

        var failureFn = function (error) {
          console.log('BackgroundGeolocation error');
        };

        backgroundGeolocation.configure(callbackFn, failureFn, {
          desiredAccuracy: 10,
          stationaryRadius: 200,
          distanceFilter: 50,
          // url: 'http://ftsasypskm.localtunnel.me/api/test',

          //httpHeaders: { 'X-FOO': 'bar' },
          // Android only section
          locationProvider: backgroundGeolocation.provider.ANDROID_ACTIVITY_PROVIDER,
          interval: 60000,
          fastestInterval: 60000,
          notificationTitle: 'Background tracking',
          notificationText: 'enabled'
        });

        backgroundGeolocation.watchLocationMode(
          function (enabled) {
            console.log("watchLocationMode " + enabled);
            if (enabled) {
              // location service are now enabled

              backgroundGeolocation.start(function () {
                  console.log("isLocationEnabled start");
                },
                function (error) {

                  if (error.code === 2) {

                    backgroundGeolocation.showAppSettings();

                  } else {
                    console.log('Start failed: ' + error.message);

                  }
                });
            } else {
              console.log('Error watching location');
            }
          },
          function (error) {
            console.log('Error watching location mode. Error:' + error);
          }
        );

        backgroundGeolocation.isLocationEnabled(function (enabled) {

          if (enabled) {
            console.log("isLocationEnabled " + enabled);
            backgroundGeolocation.start(
              function () {

              },
              function (error) {
                if (error.code === 2) {
                  backgroundGeolocation.showAppSettings();
                } else {
                  console.log('Start failed: ' + error.message);
                }
              }
            );
          } else {
            // Location services are disabled
            backgroundGeolocation.showLocationSettings();
          }
        });

      };
    });

  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl',

      })

      .state('app.map', {
        url: '/map',

        views: {
          'menuContent': {
            templateUrl: 'templates/map.html',
            controller: 'MapCtrl'
          }
        }
      })
      .state('app.problem', {
        url: '/problem',

        views: {
          'menuContent': {
            templateUrl: 'templates/problem.html',
            controller: 'AppCtrl'
          }
        }
      })
      .state('app.problemsNearBy', {
        cache: false,
        url: '/problemsNearBy',

        views: {
          'menuContent': {
            templateUrl: 'templates/problemsNearBy.html',
            controller: 'AppCtrl'
          }
        }
      })
      .state('app.loginface', {
        url: '/loginface',
        cache: false,

        views: {
          'menuContent': {
            templateUrl: 'templates/loginface.html',
            controller: 'LoginFaceCtrl'
          }
        }
      })
      .state('app.profile', {
        url: '/profile',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/profile.html',
            controller: 'ProfileCtrl'
          }
        }
      })


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/loginface');
  });
