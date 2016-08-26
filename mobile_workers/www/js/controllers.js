angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $ionicPlatform) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    $scope.sampleOne = {};
    $scope.sampleTwo = {};
    $scope.sampleThree = {};
    console.log($scope.sampleOne);
    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function () {
        $scope.closeLogin();
      }, 1000);
    };

    $ionicModal.fromTemplateUrl('templates/sampleOne.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modalSampleOne = modal;
    });

    $scope.sampleOne = function () {
      $scope.modalSampleOne.show();
    };

    $scope.closeSampleOne = function () {
      $scope.modalSampleOne.hide();
    };

    $scope.postSampleOne = function () {

    };

    $ionicModal.fromTemplateUrl('templates/sampleTwo.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modalSampleTwo = modal;
    });

    $scope.sampleTwo = function () {
      $scope.modalSampleTwo.show();
    };

    $scope.closeSampleTwo = function () {
      $scope.modalSampleTwo.hide();
    };

    $scope.postSampleTwo = function () {

    };

    $ionicModal.fromTemplateUrl('templates/sampleThree.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modalSampleThree = modal;
    });

    $scope.sampleThree = function () {
      $scope.modalSampleThree.show();
    };

    $scope.closeSampleThree = function () {
      $scope.modalSampleThree.hide();
    };

    $scope.postSampleThree = function () {

    };

    $scope.openModals = function (openModal) {
      console.log(JSON.stringify(openModal));
      if (openModal == 'sampleOne') {
        $scope.sampleOne();
      } else if (openModal == 'sampleTwo') {
        $scope.sampleTwo();
      } else {
        $scope.sampleThree();
      }

    }

    $ionicPlatform.ready(function () {
      // Enable to debug issues.
      // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

      var notificationOpenedCallback = function (jsonData) {
        //$scope.openModals(jsonData.additionalData.model);
        var additional = jsonData.additionalData;
        console.log(JSON.stringify(additional.modal));
        console.log(additional.modal);
        $scope.openModals(additional.modal);
      };

      window.plugins.OneSignal.init("1ce04ea6-ba67-44b1-b6de-8ce49fc19659",
        {googleProjectNumber: "442430972690"},
        notificationOpenedCallback);

      // Show an alert box if a notification comes in when the user is in your app.
      window.plugins.OneSignal.enableInAppAlertNotification(true);

    });

    $scope.places = [{text: "Home", value: "home"}, {
      text: "Transportation",
      value: "transportation"
    }, {text: "Main work", value: "main work"}, {text: "Office", value: "office"}, {
      text: "Public space",
      value: "public space"
    }, {text: "Client", value: "client"}, {text: "Other", value: "other"}];

    $scope.tasks = [{text: "Main activity", value: "main activity"}, {
      text: "Related activity",
      value: "related activity"
    }];
    $scope.yesorno = [{text: "Yes", value: "yes"}, {text: "No", value: "no"}];
    $scope.persons = [{text: "Leader", value: "leader"}, {text: "Colleague", value: "colleague"}, {
      text: "Client",
      value: "client"
    }, {text: "Team member", value: "team member"}, {text: "Other", value: "other"}];
    $scope.feelings = [{text: "Positive", value: "positive"}, {text: "Negative", value: "negative"}];
    $scope.positiveFeelings = [{text: "Enthusiasm", value: "enthusiasm"}, {
      text: "Interest",
      value: "interest"
    }, {text: "Determination", value: "determination"}, {text: "Being energetic", value: "being energetic"}];
    $scope.negativeFeelings = [{text: "Irritation", value: "irritation"}, {
      text: "Exhaustion",
      value: "exhaustion"
    }, {text: "Nervousness", value: "nervousness"}, {text: "Anxiety", value: "anxiety"}];
    $scope.placesToFindInformation = [{text: "People Network", value: "people network"}, {
      text: "Internet",
      value: "internet"
    }, {text: "Book", value: "book"}, {text: "Other", value: "other"}];
    $scope.comunicationTools = [{text: "Face-to-face conversation", value: "facetoface"}, {
      text: "Call",
      value: "call"
    }, {text: "Text Message", value: "text message"}, {
      text: "WhatsApp Audio",
      value: "whatsapp audio"
    }, {text: "Whatsapp Text", value: "whatsapp text"}, {text: "Skype", value: "skype"}, {
      text: "Other",
      value: "other"
    }];


  })
  .controller('LoginFaceCtrl', function ($scope, $cordovaOauth, $localStorage, $location) {
    $scope.login = function () {
      $cordovaOauth.facebook("1102648526473457", ["email", "user_website", "user_location", "user_relationships"]).then(function (result) {
        $localStorage.accessToken = result.access_token;
        $location.path("#/profile");

      }, function (error) {
        console.log("There was a problem signing in!  See the console for logs");
        alert("There was a problem signing in!  See the console for logs");
        console.log(error);
      });
    };
  })
  .controller('ProfileCtrl', function ($scope, $http, $localStorage, $location) {
    $scope.init = function () {
      if ($localStorage.hasOwnProperty("accessToken") === true) {
        $http.get("https://graph.facebook.com/v2.2/me", {
          params: {
            access_token: $localStorage.accessToken,
            fields: "id,name,gender,location,website,picture,relationship_status",
            format: "json"
          }
        }).then(function (result) {
          $scope.profileData = result.data;
        }, function (error) {
          alert("There was a problem getting your profile.  Check the logs for details.");
          console.log(error);
        });
      } else {
        console.log("Not signed in");
        alert("Not signed in");
        $location.path("#/profile");
      }
    };
  })
  .controller('MapCtrl', function ($scope, $state, $ionicPlatform, mapService, bgGeolocationService, $rootScope, $interval, test) {


    $ionicPlatform.ready(function () {

      $scope.watchLocations = function () {


        backgroundGeolocation.getLocations(
          function (locations) {
            console.log("getLocations");
            console.log(JSON.stringify(locations));
          }
        );


      };




      var position = {lat: -25.363, lng: 131.044};

      $scope.map = mapService.createMap(position);
      //bgGeolocationService.run();

      $ionicPlatform.ready(function () {

        var callbackFn = function (location) {
          console.log('[js] BackgroundGeolocation callback:  ' + location.latitude + ',' + location.longitude);
          var latlng = {latitude: location.latitude, longitude: location.longitude};
          $rootScope.$emit('geolocationUpdated', new google.maps.LatLng(location.latitude, location.longitude));
          locationsSave = {user: "gabriel", locations: latlng, date: new Date()};
          test.save(locationsSave);

          backgroundGeolocation.finish();

        };


        var failureFn = function (error) {
          console.log('BackgroundGeolocation error');
        };

        backgroundGeolocation.configure(callbackFn, failureFn, {
          desiredAccuracy: 10,
          stationaryRadius: 1,
          distanceFilter: 50,
         // url: 'http://ftsasypskm.localtunnel.me/api/test',

          //httpHeaders: { 'X-FOO': 'bar' },
          // Android only section
          locationProvider: backgroundGeolocation.provider.ANDROID_ACTIVITY_PROVIDER,
          interval: 10,
          fastestInterval: 5,
          activitiesInterval: 10,
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
                console.log("isLocationEnabled start");
                /*$interval(function () {
                  $scope.watchLocations();
                }, 60000);*/
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

      });

      $rootScope.$on('geolocationUpdated', function (event, latlngDate) {
        $scope.map.marker.setPosition(latlngDate);
      });
      //$scope.marker = this.createMarker(position, $scope.map);

    });

  })


  .controller('PlaylistsCtrl', function ($scope) {
    $scope.playlists = [
      {title: 'Reggae', id: 1},
      {title: 'Chill', id: 2},
      {title: 'Dubstep', id: 3},
      {title: 'Indie', id: 4},
      {title: 'Rap', id: 5},
      {title: 'Cowbell', id: 6}
    ];
  })

  .controller('PlaylistCtrl', function ($scope, $stateParams) {
  });
