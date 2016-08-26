'use strict';

angular.module('starter.services', ['ngResource'])
  .constant("baseURL", "http://ftsasypskm.localtunnel.me/api/")
  .factory('geolocationFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

    return $resource(baseURL + "geolocation");

  }])
  .factory('test', ['$resource', 'baseURL', function ($resource, baseURL) {

    return $resource(baseURL + "test");

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
  .service('bgGeolocationService', ['$ionicPlatform', 'baseURL', function ($ionicPlatform, baseURL, $window, $rootScope) {
    this.run = function() {


    }


  }])
;
