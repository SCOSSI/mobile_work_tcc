'use strict';

angular.module('starter.services', ['ngResource'])
  .constant("baseURL", "https://mysterious-savannah-76174.herokuapp.com/api/")
  .factory('geolocationFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

    return $resource(baseURL + "addUserGeolocation");

  }])
  .factory('sampleOneFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

    return $resource(baseURL + "addSampleOne");

  }])
  .factory('sampleTwoFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

    return $resource(baseURL + "addSampleTwo");

  }])
  .factory('sampleThreeFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

    return $resource(baseURL + "addSampleThree");

  }])
  .factory('problemFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

    return $resource(baseURL + "problem");

  }])

  .factory('probleamsNearFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

    return $resource(baseURL + "getProblemsNearOneKm");

  }])
  .service('user', ['$state', '$localStorage', '$http', '$q','$resource', 'baseURL', function ($state,$localStorage, $http, $q, $resource, baseURL) {

    this.addUser = function(){
      return $resource(baseURL + "addUser");
    }

    this.isAuthenticated = function(){
      if($localStorage.hasOwnProperty("accessToken") === false) {
        $state.go("app.loginface");
        return false;
      }
      return true;

    };

    this.getUser = function(){
      return $http.get("https://graph.facebook.com/v2.2/me", {
        params: {
          access_token: $localStorage.accessToken,
          fields: "id, email,name,gender,location,website,picture,relationship_status",
          format: "json"
        }
      }).then(function (result) {

         return result.data;
      }, function (error) {
        alert("There was a problem getting your profile.  Check the logs for details.");
   
        return $q.reject(error);
      });
    };
  }])

  .service('mapService', ['$ionicPlatform', 'baseURL', function ($ionicPlatform, baseURL) {



    var createMarker = function (position, map){
      var marker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        position: position
      });
      return marker;
    };

    this.createMap = function(position){
      var mapOptions = {
        center: position,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      var map = new google.maps.Map(document.getElementById("map"), mapOptions);
      var marker = createMarker(position, map);

      var mapAndMarker = {map: map, marker: marker};
      return mapAndMarker;
    };



    this.updateMarker = function changeMarkerPosition(marker, position) {
      marker.setPosition(latlng);
    }

  }])
  .service('geolocationService', [ '$cordovaGeolocation','$q', function ($cordovaGeolocation, $q) {

    this.getCurrentPosition = function() {

      var posOptions = {timeout: 100000, enableHighAccuracy: false};
      return $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
          var latLong = {latitude: position.coords.latitude, longitude: position.coords.longitude};

          return latLong;
        }, function(err) {

          return $q.reject(err);

        });

    }


  }])
;
