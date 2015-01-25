'use strict';

/**
 * @ngdoc overview
 * @name mtgEmblemsApp
 * @description
 * # mtgEmblemsApp
 *
 * Main module of the application.
 */
angular
  .module('mtgEmblemsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ])
  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/play/:gameId', {
        templateUrl: 'views/play.html',
        controller: 'HostCtrl'
      })
      .when('/watch/:gameId', {
        templateUrl: 'views/watch.html',
        controller: 'WatchCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

var shuffleArray = function(array, seed) {
  var m = array.length, t, i;
  var rng = null;
  if (seed === false) {
    rng = new Math.seedrandom();
  } else {
    rng = new Math.seedrandom(seed);
  }

  // While there remain elements to shuffle
  while (m) {
    // Pick a remaining element…
    i = Math.floor(rng() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

var makeId = function(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

'use strict';

/**
 * @ngdoc function
 * @name mtgEmblemsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mtgEmblemsApp
 */
angular.module('mtgEmblemsApp')
  .controller('MainCtrl', ["$scope", "$http", function ($scope, $http) {
      $scope.show_emblems = [];

      $scope.emblem_index = 0;
      $scope.total_index = 0;
      $scope.rounds = 0;

      $scope.reset = function () {
        $scope.show_emblems = [];
        shuffleArray($scope.emblems, false);
        shuffleArray($scope.all_emblems, false);
        $scope.rounds = 0;
        $scope.total_index = 0;
        $scope.emblem_index = 0;
      }

      $scope.next = function (permanent, automatic) {
        var i, draw_others = 0;
        var draw_others_as_permanent = false;
        var to_add = null;
        if ($scope.emblem_index >= $scope.emblems.length - 1) {
            shuffleArray($scope.emblems, false);
            $scope.emblem_index = 0;
        } else {
            $scope.emblem_index++;
        }
        if (permanent) {
          shuffleArray($scope.all_emblems, false);
          to_add = JSON.parse(JSON.stringify($scope.all_emblems[0]));
        } else {
          to_add = JSON.parse(JSON.stringify($scope.emblems[$scope.emblem_index]));
        }
        to_add.id = $scope.total_index;
        $scope.total_index++;
        if (permanent) {
          to_add.type = 'permanent';
        } else {
          to_add.type = 'standard';
        }
        if (automatic) {
          to_add.is_automatic = true;
        } else {
          $scope.rounds++;
        }
        $scope.show_emblems.push(to_add);
        if ($scope.emblems[$scope.emblem_index].draw_others > 0) {
          draw_others = $scope.emblems[$scope.emblem_index].draw_others;
          if ($scope.emblems[$scope.emblem_index].permanent) {
            draw_others_as_permanent = $scope.emblems[$scope.emblem_index].permanent;
          }
          for (i = 0; i < draw_others; i++) {
            $scope.next(draw_others_as_permanent, true);
          }
        }
      };

    $http.get('/data/emblems.json')
      .success(function(data, status, headers, config){
        $scope.all_emblems = data;
        $scope.emblems = data;
        shuffleArray($scope.emblems, false);
        shuffleArray($scope.all_emblems, false);
      })
      .error(function(data, status, headers, config) {
      
      });
  }]);

'use strict';

/**
 * @ngdoc function
 * @name mtgEmblemsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the mtgEmblemsApp
 */
angular.module('mtgEmblemsApp')
  .controller('AboutCtrl', ["$scope", function ($scope) {
    
  }]);

'use strict';

/**
 * @ngdoc filter
 * @name mtgEmblemsApp.filter:manaSymbols
 * @function
 * @description
 * # manaSymbols
 * Filter in the mtgEmblemsApp.
 */
angular.module('mtgEmblemsApp')
  .filter('manaSymbols', ["$sce", function ($sce) {
    return function (input) {
      var output = input.replace(/\{([0-9BWRUGPSTQXYZ]+)\}/g, function(match, match2) {
        return "<i class=\"mana nk_icon_" + match2.toLowerCase() + "\" title=\"" + match + "\"></i>";
      });
      return $sce.trustAsHtml(output);
    };
  }]);

'use strict';

/**
 * @ngdoc function
 * @name mtgEmblemsApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the mtgEmblemsApp
 */
angular.module('mtgEmblemsApp')
  .controller('HeaderCtrl', ["$scope", "$location", function ($scope, $location) {
    $scope.isActive = function (viewLocation) { 
      return viewLocation === $location.path();
    };
  }]);

'use strict';

/**
 * @ngdoc function
 * @name mtgEmblemsApp.controller:HostCtrl
 * @description
 * # HostCtrl
 * Controller of the mtgEmblemsApp
 */
angular.module('mtgEmblemsApp')
  .controller('HostCtrl', ["$scope", "$routeParams", "$http", "$firebase", function ($scope, $routeParams, $http, $firebase) {
      var ref = new Firebase("https://mtg-emblems.firebaseio.com/" + $routeParams.gameId);
      var root = $firebase(ref);
      var emblems = $firebase(ref.child("emblems"));
      var metadata = $firebase(ref.child("metadata"));
      $scope.show_emblems = emblems.$asArray();
      

      $scope.emblem_index = 0;
      $scope.total_index = 0;
      $scope.rounds = 0;

      $scope.reset = function () {
        root.$remove();
        shuffleArray($scope.emblems);
        shuffleArray($scope.all_emblems);
        $scope.rounds = 0;
        $scope.total_index = 0;
        $scope.emblem_index = 0;
      }

      $scope.next = function (permanent, automatic) {
        var i, draw_others = 0;
        var draw_others_as_permanent = false;
        var to_add = null;
        if ($scope.emblem_index >= $scope.emblems.length - 1) {
            shuffleArray($scope.emblems);
            $scope.emblem_index = 0;
        } else {
            $scope.emblem_index++;
        }
        if (permanent) {
          shuffleArray($scope.all_emblems);
          to_add = JSON.parse(JSON.stringify($scope.all_emblems[0]));
        } else {
          to_add = JSON.parse(JSON.stringify($scope.emblems[$scope.emblem_index]));
        }
        to_add.id = $scope.total_index;
        $scope.total_index++;
        if (permanent) {
          to_add.type = 'permanent';
        } else {
          to_add.type = 'standard';
        }
        if (automatic) {
          to_add.is_automatic = true;
        } else {
          $scope.rounds++;
        }
        $scope.show_emblems.$add(to_add);
        if ($scope.emblems[$scope.emblem_index].draw_others > 0) {
          draw_others = $scope.emblems[$scope.emblem_index].draw_others;
          if ($scope.emblems[$scope.emblem_index].permanent) {
            draw_others_as_permanent = $scope.emblems[$scope.emblem_index].permanent;
          }
          for (i = 0; i < draw_others; i++) {
            $scope.next(draw_others_as_permanent, true);
          }
        }
      };

    $http.get('/data/emblems.json')
      .success(function(data, status, headers, config){
        $scope.all_emblems = data;
        $scope.emblems = data;
        shuffleArray($scope.emblems);
        shuffleArray($scope.all_emblems);
      })
      .error(function(data, status, headers, config) {
      
      });
  }]);

'use strict';

/**
 * @ngdoc function
 * @name mtgEmblemsApp.controller:WatchCtrl
 * @description
 * # WatchCtrl
 * Controller of the mtgEmblemsApp
 */
angular.module('mtgEmblemsApp')
  .controller('WatchCtrl', ["$scope", "$routeParams", "$firebase", function ($scope, $routeParams, $firebase) {
      var ref = new Firebase("https://mtg-emblems.firebaseio.com/" + $routeParams.gameId);
      var sync = $firebase(ref.child("emblems"));
      $scope.show_emblems = sync.$asArray();
  }]);
