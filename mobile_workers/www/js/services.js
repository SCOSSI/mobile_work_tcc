'use strict';

angular.module('starter.services', ['ngResource'])
  .constant("baseURL", "http://s.localtunnel.me/api/")
  .factory('geolocationFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

    return $resource(baseURL + "geolocation");

  }])
  .factory('sampleOneFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

    return $resource(baseURL + "addSampleOne");

  }])
  .factory('test', ['$resource', 'baseURL', function ($resource, baseURL) {

    return $resource(baseURL + "test");

  }])
  .service('user', ['$state', '$localStorage', '$http', function ($state,$localStorage, $http) {
    this.isAuthenticated = function(){
      if($localStorage.hasOwnProperty("accessToken") === false) {
        $state.go("app.loginface");
        return false;
      }
      return true;

    };

    this.getUser = function(){
      $http.get("https://graph.facebook.com/v2.2/me", {
        params: {
          access_token: $localStorage.accessToken,
          fields: "id, email,name,gender,location,website,picture,relationship_status",
          format: "json"
        }
      }).then(function (result) {
        console.log(JSON.stringify(result.data));
         return result.data;
      }, function (error) {
        alert("There was a problem getting your profile.  Check the logs for details.");
        console.log(error);
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
  .service('geolocationService', [ '$cordovaGeolocation', function ($cordovaGeolocation) {
    this.getCurrentPosition = function() {
      var posOptions = {timeout: 10000, enableHighAccuracy: false};
      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
          var latLong = {latitude: position.coords.latitude, longitude: position.coords.longitude};
          console.log(JSON.stringify(latLong));
          return latLong;
        }, function(err) {
          console.log(JSON.stringify(err));
        });

    }


  }])
;
