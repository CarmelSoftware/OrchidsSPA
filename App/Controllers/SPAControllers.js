var oOrchidsApp = angular.module('OrchidsApp', ['ngRoute','ngResource']);

oOrchidsApp.config(['$routeProvider', function ($routeProvider) {

    $routeProvider

    .when('/',
        {
            templateUrl: "/AngularJS/App/Views/OrchidsList.html",
            controller: "OrchidsAllCtl"
        })
    .when('/add',
        {
            templateUrl: "/AngularJS/App/Views/OrchidsAdd.html",
            controller: "OrchidsAddCtl"
        })
     .when('/edit/:id',
        {
            templateUrl: "/AngularJS/App/Views/OrchidsEdit.html",
            controller: "OrchidsEditCtl"
        })
    .when('/delete/:id',
        {
            templateUrl: "/AngularJS/App/Views/OrchidsDelete.html",
            controller: "OrchidsDeleteCtl"
        })
    .otherwise({ redirectTo: "/" });

}]);

oOrchidsApp.value('msg', { value: '' });

oOrchidsApp.factory('OrchidsResource', ['$resource',function ($resource) {
    var sURLDev = 'http://localhost:21435/WebAPI/OrchidsWebAPI/:id' ;
    var sURLProd = 'http://CARMELWEBAPI.SOMEE.COM/WebAPI/OrchidsWebAPI/:id';
    var bIsDevelopmentTest = true;
    var sURL = bIsDevelopmentTest ? sURLDev : sURLProd;
    return $resource(sURL, { id: "@id" }); 
}]);

oOrchidsApp.factory('SharingService', [function () {

    var oFlowersPictures = ["haeckel_orchidae.jpg", "Bulbophyllum.jpg", "Cattleya.jpg", "Orchid Calypso.jpg", "Paphiopedilum_concolor.jpg", "Peristeria.jpg", "Phalaenopsis_amboinensis.jpg", "Sobralia.jpg"];
    var sURLDev = 'http://localhost:21435/WebAPI/OrchidsWebAPI/';
    var sURLProd = 'http://CARMELWEBAPI.SOMEE.COM/WebAPI/OrchidsWebAPI/';
    var bIsDevelopmentTest = true;
    var sURL = bIsDevelopmentTest ? sURLDev : sURLProd;
    
    return {
        getFlowers: function () { return oFlowersPictures; },
        getURL: function () { return sURL ; }
        
    };
}]);



oOrchidsApp.controller('OrchidsAllCtl', ['SharingService', '$scope', '$http', '$log', 'msg', function (SharingService, $scope, $http, $log, msg) {

    $scope.angularClass = "angular";
    $scope.OrchidsList = [];
    $scope.pageSize = 2;
    var iCurrentPage = -1; 
     

    $scope.fnShowOrchids = function (direction) {

        iCurrentPage = iCurrentPage + direction;
        iCurrentPage = iCurrentPage >= 0 ? iCurrentPage : 0;
        
        var sURL = SharingService.getURL() +
            "?$skip=" +
            iCurrentPage * $scope.pageSize
            + "&$top=" +
            $scope.pageSize;


        $http.get(sURL).success(function (response) {

            $scope.OrchidsList = response;
            $log.info("OK");

        },function (err) { $log.error(err) })
        
        $scope.Message = "";
        
    }

    $scope.fnShowOrchids(1);
    $scope.Message = msg.value;

}
]);

oOrchidsApp.controller('OrchidsAddCtl',
    ['SharingService', '$http', '$scope', '$location', '$log', 'msg',
        function (SharingService, $http, $scope, $location, $log, msg) {
            msg.value = "";
            $scope.Flowers = SharingService.getFlowers();
            
            $scope.fnAdd = function () {

                var oFlower = { "Title": $scope.Orchid.Title, "Text": $scope.Orchid.Text, "MainPicture": $scope.Orchid.MainPicture };    

                $http({
                    url: SharingService.getURL(),
                    method: "POST",
                    data: oFlower, 
                    headers: { 'Content-Type': 'application/json' }
                }).success(function (data, status, headers, config) {
                    msg.value = "New Orchid saved";
                    $scope.IsSaved = true;
                }).error(function (err) {
                     $log.error(err);
                });                
            }

            $scope.fnShowMsg = function () { return msg.value; }
            
}
]);



oOrchidsApp.controller('OrchidsEditCtl',
    ['OrchidsResource', 'SharingService', '$http', '$routeParams', '$scope', '$location', '$log', 'msg',
        function (OrchidsResource, SharingService, $http, $routeParams, $scope, $location, $log, msg) {

    msg.value = "";
    $scope.Flowers = SharingService.getFlowers();
    $scope.Orchid = OrchidsResource.get({ id: $routeParams.id });

    $scope.fnEdit = function () {
                
        var oFlower = { "BlogId": $routeParams.id , "Title": $scope.Orchid.Title, "Text": $scope.Orchid.Text, "MainPicture": $scope.Orchid.MainPicture };
        
        $http({
            url: SharingService.getURL() + $routeParams.id,
            method: "PATCH",
            data: oFlower,
            headers: { 'Content-Type': 'application/json' }

        }).success(function (data) { msg.value = "Orchid successfully updated"; }).error(function (err) { });

        
    }
    
    $scope.fnShowMsg = function () { return msg.value; }
}
]);



oOrchidsApp.controller('OrchidsDeleteCtl',
    ['OrchidsResource', 'SharingService', '$http', '$routeParams', '$scope', '$location', '$log', 'msg',
        function (OrchidsResource, SharingService, $http, $routeParams, $scope, $location, $log, msg) {

            msg.value = "";
            $scope.isDisabled = false;
            $scope.Orchid = OrchidsResource.get({ id: $routeParams.id });    

            $scope.fnDelete = function () {

                $http(
                {
                    url:  SharingService.getURL() + $routeParams.id,
                    method:"DELETE"

                }
                ).success(function (response) {
                    msg.value = "Orchid successfully deleted";
                    $scope.isDisabled = true;
                }).error(function (err) {  $log.error(err); });
               
            }

            $scope.fnDisable = function () { return $scope.isDisabled;}

            $scope.fnShowMsg = function () { return msg.value; }


}]);


