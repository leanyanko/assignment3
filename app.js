(function () {
    'use strict';

    angular.module('Assignment3',[])
    .controller('NarrowItDownController', NarrowItDownController)
   // .factory('menuSearchFactory', MenuSearchFactory);
   .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");
   

        NarrowItDownController.$inject=['MenuSearchService'];
        function NarrowItDownController (MenuSearchService) {
            var narrow = this;
            
            narrow.findItems = function (searchTerm) {
                var promise = MenuSearchService.GetMatchedMenuItems(searchTerm);

                promise.then(function (response) {

                narrow.items = response;
                console.log(narrow.items);
            })
            .catch(function (error) {
                console.log('error', error);
            })
            };
        }


        MenuSearchService.$inject = ['$http', 'ApiBasePath'];
        function MenuSearchService ($http, ApiBasePath) {
            var service = this;

            service.getAllItems = function () {

            }

            service.GetMatchedMenuItems = function (searchTerm) {
            return $http({
                url: (ApiBasePath + "/menu_items.json")
            }).then(function (result) {                 // process result and only keep items that match
                var foundItems = [];  
                for (var i = 0; i < result.data.menu_items.length; i++) {
                      if (result.data.menu_items[i].name.toLowerCase().indexOf(searchTerm) !== -1) {
                             foundItems.push(result.data.menu_items[i].name);
                      }
                 }
                 return foundItems;                      // return processed items
             });
        };         
               
    }
})();