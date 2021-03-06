angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $ionicPlatform, user, $rootScope, $ionicSideMenuDelegate, geolocationService, sampleOneFactory, loadingService, sampleTwoFactory, sampleThreeFactory, problemFactory, probleamsNearFactory) {


    $scope.sampleOne = {};
    $scope.sampleTwo = {};
    $scope.sampleThree = {};
    $scope.problem = {};
    $scope.problemsNearBy = {};
    $scope.showMenu = user.isAuthenticated();

    $scope.initProblemsNearBy = function () {

      loadingService.showLoading();

      geolocationService.getCurrentPosition().then(function (data) {
        $scope.problemsNearBy.latitude = data.latitude;
        $scope.problemsNearBy.longitude = data.longitude;

        probleamsNearFactory.query($scope.problemsNearBy).$promise.then(function (data) {

          $scope.problemsNearBy = data;

          loadingService.hideLoading();

        }, function (errResponse) {

          alert("Error getting your current position!");
          loadingService.hideLoading();
        });

      });
    };

    $rootScope.$on('userLogout', function (event, userLogout) {

      $scope.showMenu = !userLogout;

    });


    $ionicModal.fromTemplateUrl('templates/sampleOne.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modalSampleOne = modal;
    });

    $scope.showSampleOne = function () {
      loadingService.showLoading();
      if (user.isAuthenticated()) {
        loadingService.hideLoading();
        $scope.modalSampleOne.show();
      }
    };

    $scope.closeSampleOne = function () {
      $scope.sampleOne = {};
      $scope.modalSampleOne.hide();
    };

    $scope.postProblem = function () {

      loadingService.showLoading();

      user.getUser().then(function (data) {
        var now = new Date();
        $scope.problem.userEmail = data.email;
        $scope.problem.date = now;
        geolocationService.getCurrentPosition().then(function (data) {
          $scope.problem.latitude = data.latitude;
          $scope.problem.longitude = data.longitude;
          problemFactory.save($scope.problem).$promise.then(function () {
            $scope.problem = {};
            loadingService.hideLoading();
            alert("Problem created!");
          }, function (errResponse) {
            loadingService.hideLoading();
            alert("Error saving problem!");
          });
        }, function (error) {
          loadingService.hideLoading();
          alert("Error getting your current position!");
        });

      }, function (error) {
        alert("Error getting your informations!");
        loadingService.hideLoading();

      });


    }
    $scope.postSampleOne = function () {

      loadingService.showLoading();

      user.getUser().then(function (data) {
        var now = new Date();
        $scope.sampleOne.userEmail = data.email;
        $scope.sampleOne.date = now;
        geolocationService.getCurrentPosition().then(function (data) {
          $scope.sampleOne.latitude = data.latitude;
          $scope.sampleOne.longitude = data.longitude;
          sampleOneFactory.save($scope.sampleOne).$promise.then(function () {
            loadingService.hideLoading();
            alert("Sample saved!");
            $rootScope.startTracking();
            $scope.closeSampleOne();
          }, function (errResponse) {
            loadingService.hideLoading();
            alert("Error saving sample one!");
          });
        }, function (error) {
          loadingService.hideLoading();
          alert("Error getting your current position!");
        });
      }, function (error) {
        loadingService.hideLoading();
        alert("Error getting your informations!");
      });


    };

    $ionicModal.fromTemplateUrl('templates/sampleTwo.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modalSampleTwo = modal;
    });

    $scope.showSampleTwo = function () {
      loadingService.showLoading();
      if (user.isAuthenticated()) {
        loadingService.hideLoading();
        $scope.modalSampleTwo.show();
      }
    };

    $scope.closeSampleTwo = function () {
      $scope.sampleTwo = {};
      $scope.modalSampleTwo.hide();
    };

    $scope.postSampleTwo = function () {
      loadingService.showLoading();

      user.getUser().then(function (data) {
        var now = new Date();
        $scope.sampleTwo.userEmail = data.email;
        $scope.sampleTwo.date = now;
        geolocationService.getCurrentPosition().then(function (data) {
          $scope.sampleTwo.latitude = data.latitude;
          $scope.sampleTwo.longitude = data.longitude;
          sampleTwoFactory.save($scope.sampleTwo).$promise.then(function () {
            loadingService.hideLoading();
            alert("Sample saved!");
            $scope.closeSampleTwo();
          }, function (errResponse) {
            loadingService.hideLoading();
            alert("Error saving sample two!");
          });
        }, function (error) {
          loadingService.hideLoading();
          alert("Error getting your current position!");
        });
      }, function (error) {
        loadingService.hideLoading();
        alert("Error getting your informations!");
      });


    };

    $ionicModal.fromTemplateUrl('templates/sampleThree.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modalSampleThree = modal;
    });

    $scope.showSampleThree = function () {
      loadingService.showLoading();
      if (user.isAuthenticated()) {
        loadingService.hideLoading();
        $scope.modalSampleThree.show();
      }
    };

    $scope.closeSampleThree = function () {
      $scope.sampleThree = {};
      $scope.modalSampleThree.hide();
    };

    $scope.postSampleThree = function () {
      loadingService.showLoading();

      user.getUser().then(function (data) {
        var now = new Date();
        $scope.sampleThree.userEmail = data.email;
        $scope.sampleThree.date = now;
        geolocationService.getCurrentPosition().then(function (data) {
          $scope.sampleThree.latitude = data.latitude;
          $scope.sampleThree.longitude = data.longitude;
          sampleThreeFactory.save($scope.sampleThree).$promise.then(function () {
            loadingService.hideLoading();
            alert("Sample saved!");
            $scope.closeSampleThree();
          }, function (errResponse) {
            loadingService.hideLoading();
            alert("Error saving sample three!");
          });
        }, function (error) {
          alert("Error getting your current position!");
          loadingService.hideLoading();
        });
      }, function (error) {
        loadingService.hideLoading();
        alert("Error getting your informations!");
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

    $scope.problems = [{text: "No internet Access", value: "internet"}, {
      text: "Transportation",
      value: "transportation"
    }, {text: "Workplace", value: "transportation"}, {
      text: "Communication",
      value: "communication"
    }, {text: "Work equipment", value: "equipment"},{text: "Data transfer", value: "dataTransfer"}, {text: "Other", value: "other"}];
  })
  .controller('LoginFaceCtrl', function ($scope, $cordovaOauth, $localStorage, $ionicSideMenuDelegate, user, $state, $rootScope, $ionicPlatform, $ionicHistory, loadingService) {

    if (user.isAuthenticated()) {
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go("app.problem");
    }

    $ionicPlatform.ready(function () {
      // Enable to debug issues.
      // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

      var notificationOpenedCallback = function (jsonData) {
        //$scope.openModals(jsonData.additionalData.model);
        var additional = jsonData.additionalData;
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
      loadingService.showLoading();
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
            loadingService.hideLoading();
            $state.go("app.problem");
          }, function (errResponse) {
            loadingService.hideLoading();
            console.log(errResponse);
          });
        }, function (error) {
          loadingService.hideLoading();
          console.log("error in getting user!");
        });

      }, function (error) {
        loadingService.hideLoading();
        console.log("There was a problem signing in!  See the console for logs");
        alert("There was a problem signing in!  See the console for logs");
      });
    };


  })
  .controller('ProfileCtrl', function ($scope, $http, $localStorage, $state, user, $rootScope, loadingService, $ionicHistory, $ionicSideMenuDelegate) {
    $scope.init = function () {
      if (user.isAuthenticated()) {

        $ionicSideMenuDelegate.canDragContent(true);
        loadingService.showLoading();

        user.getUser().then(function (data) {
          $scope.profileData = data;
          loadingService.hideLoading();
        }, function (error) {
          loadingService.hideLoading();
          alert("Error getting your informations!");
        });


      }
    };

    $scope.logout = function () {
      delete $localStorage.accessToken;
      $rootScope.$emit('userLogout', true);
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go("app.loginface");

    }
  })
  .controller('MapCtrl', function ($scope, $state, $ionicPlatform, mapService, $rootScope, $interval, geolocationFactory, user) {

      var position = {lat: -25.363, lng: 131.044};

      $scope.map = mapService.createMap(position);


      $rootScope.startTracking();

      $rootScope.$on('geolocationUpdated', function (event, latlng) {
        $scope.map.marker.setPosition(latlng);
        $scope.map.map.setCenter(latlng);

      });


  })



