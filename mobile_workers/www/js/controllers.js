angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $ionicPlatform, user, $rootScope, $ionicSideMenuDelegate, geolocationService, sampleOneFactory, $ionicLoading, sampleTwoFactory, sampleThreeFactory, problemFactory) {


    $scope.sampleOne = {};
    $scope.sampleTwo = {};
    $scope.sampleThree = {};
    $scope.problem = {};
    $scope.showMenu = user.isAuthenticated();


    $rootScope.$on('userLogout', function (event, userLogout) {
      console.log("userLogout: " + userLogout);
      $scope.showMenu = !userLogout;
      $ionicSideMenuDelegate.canDragContent(!userLogout);
    });


    $ionicModal.fromTemplateUrl('templates/sampleOne.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modalSampleOne = modal;
    });

    $scope.showSampleOne = function () {
      if (user.isAuthenticated()) {
        $scope.modalSampleOne.show();
      }
    };

    $scope.closeSampleOne = function () {
      $scope.sampleOne = {};
      $scope.modalSampleOne.hide();
    };

    $scope.postProblem = function(){

      $ionicLoading.show({
        content: 'Loading...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });

      user.getUser().then(function (data) {
        var now = new Date();
        $scope.problem.userEmail = data.email;
        $scope.problem.date = now;
        geolocationService.getCurrentPosition().then(function (data) {
          $scope.problem.latitude = data.latitude;
          $scope.problem.longitude = data.longitude;
          problemFactory.save($scope.problem).$promise.then(function () {
            alert("Problem created!");
          }, function (errResponse) {
            console.log(JSON.stringify(errResponse));
          });
          console.log(JSON.stringify($scope.problem));
          $ionicLoading.hide();

        }, function (error) {
          console.log("error in getting current position problem!");
         problemFactory.save($scope.problem).$promise.then(function () {
            alert("Problem created!");
          }, function (errResponse) {
            console.log(JSON.stringify(errResponse));
          });
          $ionicLoading.hide();
        });

      }, function (error) {
        $ionicLoading.hide();
        console.log("error in getting user problem!");
      });


    }
    $scope.postSampleOne = function () {

      $ionicLoading.show({
        content: 'Loading...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });

      user.getUser().then(function (data) {
        var now = new Date();
        $scope.sampleOne.userEmail = data.email;
        $scope.sampleOne.date = now;
        geolocationService.getCurrentPosition().then(function (data) {
          $scope.sampleOne.latitude = data.latitude;
          $scope.sampleOne.longitude = data.longitude;
          sampleOneFactory.save($scope.sampleOne).$promise.then(function () {
            $scope.closeSampleOne();
          }, function (errResponse) {
            console.log(JSON.stringify(errResponse));
          });
          console.log(JSON.stringify($scope.sampleOne));
          $ionicLoading.hide();

        }, function (error) {
          console.log("error in getting current posiction sample two!");
          sampleOneFactory.save($scope.sampleOne).$promise.then(function () {
            $scope.closeSampleOne();
          }, function (errResponse) {
            console.log(JSON.stringify(errResponse));
          });
          $ionicLoading.hide();
        });

      }, function (error) {
        $ionicLoading.hide();
        console.log("error in getting user sample two!");
      });


    };

    $ionicModal.fromTemplateUrl('templates/sampleTwo.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modalSampleTwo = modal;
    });

    $scope.showSampleTwo = function () {
      if (user.isAuthenticated()) {
        $scope.modalSampleTwo.show();
      }
    };

    $scope.closeSampleTwo = function () {
      $scope.sampleTwo = {};
      $scope.modalSampleTwo.hide();
    };

    $scope.postSampleTwo = function () {
      $ionicLoading.show({
        content: 'Loading...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });

      user.getUser().then(function (data) {
        var now = new Date();
        $scope.sampleTwo.userEmail = data.email;
        $scope.sampleTwo.date = now;
        geolocationService.getCurrentPosition().then(function (data) {
          $scope.sampleTwo.latitude = data.latitude;
          $scope.sampleTwo.longitude = data.longitude;
          sampleTwoFactory.save($scope.sampleTwo).$promise.then(function () {
            $scope.closeSampleTwo();
          }, function (errResponse) {
            console.log(errResponse);
          });
          console.log(JSON.stringify($scope.sampleTwo));
          $ionicLoading.hide();

        }, function (error) {
          console.log("error in getting current posiction sample one!");
          sampleTwoFactory.save($scope.sampleOne).$promise.then(function () {
            $scope.closeSampleTwo();
          }, function (errResponse) {
            console.log(errResponse);
          });
          $ionicLoading.hide();
        });

      }, function (error) {
        $ionicLoading.hide();
        console.log("error in getting user sample one!");
      });


    };

    $ionicModal.fromTemplateUrl('templates/sampleThree.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modalSampleThree = modal;
    });

    $scope.showSampleThree = function () {
      if (user.isAuthenticated()) {
        $scope.modalSampleThree.show();
      }
    };

    $scope.closeSampleThree = function () {
      $scope.sampleThree = {};
      $scope.modalSampleThree.hide();
    };

    $scope.postSampleThree = function () {
      $ionicLoading.show({
        content: 'Loading...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });

      user.getUser().then(function (data) {
        var now = new Date();
        $scope.sampleThree.userEmail = data.email;
        $scope.sampleThree.date = now;
        geolocationService.getCurrentPosition().then(function (data) {
          $scope.sampleThree.latitude = data.latitude;
          $scope.sampleThree.longitude = data.longitude;
          sampleThreeFactory.save($scope.sampleThree).$promise.then(function () {
            $scope.closeSampleThree();
          }, function (errResponse) {
            console.log(errResponse);
          });
          console.log(JSON.stringify($scope.sampleThree));
          $ionicLoading.hide();

        }, function (error) {
          console.log("error in getting current posiction sample Three!");
          sampleThreeFactory.save($scope.sampleThree).$promise.then(function () {
            $scope.closeSampleThree();
          }, function (errResponse) {
            console.log(errResponse);
          });
          $ionicLoading.hide();
        });

      }, function (error) {
        $ionicLoading.hide();
        console.log("error in getting user sample Three!");
      });

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

    $scope.problems = [{text: "No internet Access", value: "internet"}, {text: "Transportation", value: "transportation"}, {text: "Workplace", value: "transportation"}, {text: "Communication", value: "communication"}, {text: "Work equipment", value: "equipment"}, {text: "Other", value: "other"}];
  })
  .controller('LoginFaceCtrl', function ($scope, $cordovaOauth, $localStorage, $ionicSideMenuDelegate, user, $state, $rootScope, $ionicPlatform, $ionicHistory) {

    if(user.isAuthenticated()){
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go("app.profile");
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


        $ionicSideMenuDelegate.canDragContent(false);

        $scope.login = function () {
          $cordovaOauth.facebook("1102648526473457", ["email", "user_website", "user_location", "user_relationships"]).then(function (result) {
            $localStorage.accessToken = result.access_token;
            user.getUser().then(function (data) {
              var now = new Date();
              var userToAdd = {email: data.email, name: data.email, date: now}
              user.addUser().save(userToAdd).$promise.then(function () {

                $rootScope.$emit('userLogout', false);
                $ionicHistory.nextViewOptions({
                  disableBack: true
                });
                $state.go("app.profile");
                }, function (errResponse) {
                  console.log(JSON.stringify(errResponse));
                  console.log("Try again!");
                });
            }, function (error) {
              console.log("error in getting user!");
            });

          }, function (error) {
            console.log("There was a problem signing in!  See the console for logs");
            alert("There was a problem signing in!  See the console for logs");
            console.log(error);
          });
        };


  })
  .controller('ProfileCtrl', function ($scope, $http, $localStorage, $state, user, $rootScope, $ionicLoading, $ionicHistory) {
    $scope.init = function () {
      console.log($localStorage.hasOwnProperty("accessToken"));
//      console.log(user.isAuthenticated());
      if (user.isAuthenticated()) {
        $ionicLoading.show({
          content: 'Loading...',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
        });

        user.getUser().then(function (data) {
          $scope.profileData = data;
          $ionicLoading.hide();
        }, function (error) {
          $ionicLoading.hide();
          console.log("error in getting user sample one!");
        });

        console.log(JSON.stringify($scope.profileData));
      }
    };

    $scope.logout = function () {
      delete $localStorage.accessToken;
      console.log($localStorage.hasOwnProperty("accessToken"));
      $rootScope.$emit('userLogout', true);
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go("app.loginface");

    }
  })
  .controller('MapCtrl', function ($scope, $state, $ionicPlatform, mapService, $rootScope, $interval, geolocationFactory, user) {


    $ionicPlatform.ready(function () {


      var position = {lat: -25.363, lng: 131.044};

      $scope.map = mapService.createMap(position);


      $ionicPlatform.ready(function () {

        var callbackFn = function (location) {
          console.log('[js] BackgroundGeolocation callback:  ' + location.latitude + ',' + location.longitude);
          var latlng = {latitude: location.latitude, longitude: location.longitude};
          $rootScope.$emit('geolocationUpdated', new google.maps.LatLng(location.latitude, location.longitude));

          user.getUser().then(function (data) {
            var now = new Date();

            locationsSave = {userEmail: data.email, latitude: location.latitude, longitude: location.longitude, date: new Date()};
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

      });

      $rootScope.$on('geolocationUpdated', function (event, latlng) {
        $scope.map.marker.setPosition(latlng);
        $scope.map.map.setCenter(latlng);

      });
      //$scope.marker = this.createMarker(position, $scope.map);

    });


  })



