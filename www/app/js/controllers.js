'use strict';

var ctrl = angular.module('ctrl', []);

ctrl.controller('mainCtrl', ['$scope', '$http', function ($scope, $http) {

  $http.get('data.json').success(function (data) {
    $scope.countries = data.countries;
    $scope.cities = data.cities;
  });

  $scope.data = (function () {
    var data;
    var temp = window.localStorage["data"];
    if (temp) {
      data = JSON.parse(temp);
    }
    return data;
  })();

  if (!$scope.data) {
    $scope.data = {
      name : '',
      mail : '',
      country : {},
      city : {},
      netWorks : [{
          name: 'Facebook',
          status: false,
          url : ''
        },
        {
          name: 'Vkontakte',
          status: false,
          url : ''
        },
        {
          name: 'Twitter',
          status: false,
          url : ''
        },
        {
          name: 'Odnoclassniki',
          status: false,
          url : ''
        }],
      image : {}
    };
  };

  $scope.save =  function () {
    window.localStorage["data"] = JSON.stringify($scope.data, function (key, val) {
      if (key == '$$hashKey') {
          return undefined;
      };
      return val
    });
  };

  $scope.$watch('data', function(){
    $scope.save();
  }, true)

  $scope.images = [{url:'img/cat1.jpg',type:'cat'},{url:'img/cat2.jpg',type:'cat'},{url:'img/cat3.jpg',type:'cat'},{url:'img/dog4.jpg',type:'dog'}]

  $scope.optionsFilter = function (city) {
    return $scope.data.country.countryNum == city.country;
  };

  $scope.startOver = function () {
    $scope.data = {
      name : '',
      mail : '',
      country : {},
      city : {},
      netWorks : [{
          name: 'Facebook',
          status: false,
          url : ''
        },
        {
          name: 'Vkontakte',
          status: false,
          url : ''
        },
        {
          name: 'Twitter',
          status: false,
          url : ''
        },
        {
          name: 'Odnoclassniki',
          status: false,
          url : ''
        }],
      image : {}
    };
  };

}]);