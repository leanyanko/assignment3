(function () {
    'use strict';

    angular.module('Assignment3',[])
    .controller('NarrowItDownController', NarrowItDownController)
//    .factory('menuSearchFactory', MenuSearchFactory)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
    .directive('foundItems', FoundItemsDirective);

   function FoundItemsDirective() {
       var ddo = {
           templateUrl: 'foundItems.html',
           scope: {
               items: '<',
               title: '@title',
               onRemove: '&'
           },
           controller: NarrowItDownDirectiveController,
           controllerAs: 'narrow',
           bindToController: true
       };
       return ddo;
   }

   function NarrowItDownDirectiveController() {
       var narrow = this;
   }

        NarrowItDownController.$inject=['MenuSearchService'];
        function NarrowItDownController (MenuSearchService) {
            var narrow = this;

     //       var menuList = MenuSearchFactory();

            narrow.items = [];

            narrow.title = "There are your list";

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

            narrow.removeItem = function (itemIndex) {
              //  menuList.removeItem(itemIndex);
              narrow.items.splice(itemIndex, 1);
            }
        }


        MenuSearchService.$inject = ['$http', 'ApiBasePath'];
        function MenuSearchService ($http, ApiBasePath) {
            var service = this;

            var foundItems = [];  

            service.GetMatchedMenuItems = function (searchTerm) {
            return $http({
                url: (ApiBasePath + "/menu_items.json")
            }).then(function (result) {                 // process result and only keep items that match
                // var foundItems = [];  
                for (var i = 0; i < result.data.menu_items.length; i++) {
                      if (result.data.menu_items[i].name.toLowerCase().indexOf(searchTerm) !== -1) {
                             foundItems.push(result.data.menu_items[i]);
                      }
                 }
                 return foundItems;                      // return processed items
             });
        };  

        // service.removeItem = function (itemIndex) {
        //     console.log(itemIndex);
        //     foundItems.splice(itemIndex, 1);
        // };       
         
    }

    // function MenuSearchFactory() {
    //     var factory = function () {
    //       return new MenuSearchService();
    //     };
    //  return factory;
    // }

})();