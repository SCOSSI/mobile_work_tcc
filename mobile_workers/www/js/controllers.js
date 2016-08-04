angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    $scope.sampleOne = {};
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

    };

    $scope.postSampleOne = function () {

    };

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
    $scope.positiveFeelings = [{text: "Enthusiasm", value: "enthusiasm"}, {text: "Interest", value: "interest"}, {text: "Determination", value: "determination"}, {text: "Being energetic", value: "being energetic"}];
    $scope.negativeFeelings = [{text: "Irritation", value: "irritation"}, {text: "Exhaustion", value: "exhaustion"}, {text: "Nervousness", value: "nervousness"}, {text: "Anxiety", value: "anxiety"}];



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
  .controller('MapCtrl', function ($scope, $state, $cordovaGeolocation, $ionicPlatform, geolocationFactory) {

    function showMap(position) {

      var latLng = {lat: position.coords.latitude, lng: position.coords.longitude};

      var mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

      google.maps.event.addListenerOnce($scope.map, 'idle', function () {

        var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: latLng
        });

        var infoWindow = new google.maps.InfoWindow({
          content: "Here I am!"
        });

        google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
        });

      });
    };


    $ionicPlatform.ready(function () {
      var watchOptions = {
        timeout: 3000,
        enableHighAccuracy: true // may cause errors if true
      };

      var watch = $cordovaGeolocation.watchPosition(watchOptions);
      watch.then(
        null,
        function (err) {
          console.log(err);
        },
        function (position) {
          console.log(position);
          var lat = position.coords.latitude;
          var long = position.coords.longitude;
          geolocationFactory.save({nome: 'teste', longitude: long, latitude: lat});
          showMap(position);
        });

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
