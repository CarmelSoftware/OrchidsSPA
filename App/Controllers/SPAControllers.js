var oOrchidsApp = angular.module('OrchidsApp', ['ngRoute']);

oOrchidsApp.config(['$routeProvider', function ($routeProvider) {

    $routeProvider

    .when('/',
        {
            templateUrl: "/App/Views/OrchidsList.html",
            controller: "OrchidsAllCtl"
        })
    .when('/add',
        {
            templateUrl: "/App/Views/OrchidsAdd.html",
            controller: "OrchidsAddCtl"
        })
    .otherwise({ redirectTo: "/" });

}]);

oOrchidsApp.controller('OrchidsAllCtl', ['$scope', '$http', '$log', function ($scope, $http, $log) {

    $scope.angularClass = "angular";
    $scope.OrchidsList = [];
    $scope.pageSize = 2;
    var iCurrentPage = -1;
    

    $scope.fnShowOrchids = function (direction) {

        iCurrentPage = iCurrentPage + direction;
        iCurrentPage = iCurrentPage >= 0 ? iCurrentPage : 0;

        var sURL = "http://carmelwebapi.somee.com/WebAPI/OrchidsWebAPI/" +
            "?$skip=" +
            iCurrentPage * $scope.pageSize
            + "&$top=" +
            $scope.pageSize;


        $http.get(sURL).success(function (response) {

            $scope.OrchidsList = response;
            $log.info("OK");

        },
         function (err) { $log.error(err) }
       )
    }

    $scope.fnShowOrchids(1);


}
]);

oOrchidsApp.controller('OrchidsAddCtl', 
                       ['$http', '$scope', '$location', '$log', 
                        function ($http, $scope, $location, $log) {

    $scope.Flowers = ["haeckel_orchidae", "Bulbophyllum", "Cattleya", 
                      "Orchid Calypso", "Paphiopedilum_concolor", 
                      "Peristeria", "Phalaenopsis_amboinensis", "Sobralia"];

    $scope.fnAdd = function () {

        var oFlower = { "Title": $scope.Orchid.Title, 
                       "Text": $scope.Orchid.Text, 
                       "MainPicture": $scope.Orchid.MainPicture + '.jpg' 
                      };
       

        $http({
            url: 'http://carmelwebapi.somee.com/WebAPI/OrchidsWebAPI/',
            method: "POST",
            data: oFlower,
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {            
             $scope.msg = "New Orchid saved";
        }).error(function (err) {
             $log.log(err);
        });

    }
}
]);
