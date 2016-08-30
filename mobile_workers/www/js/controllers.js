angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $ionicPlatform, user, $rootScope, $ionicSideMenuDelegate, geolocationService, sampleOneFactory) {


    $scope.sampleOne = {};
    $scope.sampleTwo = {};
    $scope.sampleThree = {};
    $scope.showMenu = user.isAuthenticated();

    $rootScope.$on('userLogout', function (event, userLogout) {
      console.log("userLogout: "+userLogout);
      $scope.showMenu = !userLogout;
      $ionicSideMenuDelegate.canDragContent(!userLogout);
    });


    $ionicModal.fromTemplateUrl('templates/sampleOne.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modalSampleOne = modal;
    });

    $scope.showSampleOne = function () {
      if(user.isAuthenticated()) {
        $scope.modalSampleOne.show();
      }
    };

    $scope.closeSampleOne = function () {
      $scope.modalSampleOne.hide();
    };

    $scope.postSampleOne = function () {
      $scope.sampleOne.latitude = 0;
      $scope.sampleOne.longitude = 1;
      $scope.sampleOne.userEmail = 'gabrielscossi@gmail.com';
      console.log(JSON.stringify($scope.sampleOne));
      sampleOneFactory.save($scope.sampleOne);
      //geolocationService.getCurrentPosition();

    };

    $ionicModal.fromTemplateUrl('templates/sampleTwo.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modalSampleTwo = modal;
    });

    $scope.showSampleTwo = function () {
      if(user.isAuthenticated()) {
        $scope.modalSampleTwo.show();
      }
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

    $scope.showSampleThree = function () {
      if(user.isAuthenticated()) {
        $scope.modalSampleThree.show();
      }
    };

    $scope.closeSampleThree = function () {
      $scope.modalSampleThree.hide();
    };

    $scope.postSampleThree = function () {

    };

    $scope.openModals = function (openModal) {

        if (openModal == 'sampleOne') {
          $scope.showSampleOne();
        } else if (openModal == 'sampleTwo') {
          $scope.showSampleTwo();
        } else {
          $scope.showSampleThree();
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
  .controller('LoginFaceCtrl', function ($scope, $cordovaOauth, $localStorage, $ionicSideMenuDelegate, user, $state, $rootScope) {
    if (!user.isAuthenticated()) {
      $ionicSideMenuDelegate.canDragContent(false);

      $scope.login = function () {
        $cordovaOauth.facebook("1102648526473457", ["email", "user_website", "user_location", "user_relationships"]).then(function (result) {

          $localStorage.accessToken = result.access_token;
          //location.path("#/profile");
          $rootScope.$emit('userLogout', false);
          $state.go("app.profile");

        }, function (error) {
          console.log("There was a problem signing in!  See the console for logs");
          alert("There was a problem signing in!  See the console for logs");
          console.log(error);
        });
      };
    }
  })
  .controller('ProfileCtrl', function ($scope, $http, $localStorage, $state, user, $rootScope) {
    $scope.init = function () {
      if (user.isAuthenticated()){

        $scope.profileData = user.getUser();
        console.log( JSON.stringify($scope.profileData ));
      }
    };

    $scope.logout = function(){
      delete $localStorage.accessToken;
      $rootScope.$emit('userLogout', true);
      $state.go("app.loginface");

    }
  })
  .controller('MapCtrl', function ($scope, $state, $ionicPlatform, mapService,  $rootScope, $interval, test, user) {


      $ionicPlatform.ready(function () {




        var position = {lat: -25.363, lng: 131.044};

        $scope.map = mapService.createMap(position);


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



