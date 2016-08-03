'use strict';

angular.module('starter.services', ['ngResource'])
  .constant("baseURL", "http://localhost:3000/api/")
  .factory('geolocationFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

    return $resource(baseURL + "geolocation");

  }]);
