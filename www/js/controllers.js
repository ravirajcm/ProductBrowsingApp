angular.module('starter.controllers', [])
    .controller('CategoriesCtrl', function ($scope, $stateParams, categoryService) {
        categoryService.get().then(function (data) {
            $scope.data = data;
        });

    })
    .controller('BookListCtrl', function ($scope, $stateParams, booksService) {
        console.log("BookListCtrl");
        $scope.catID = $stateParams.catID;
        console.log($scope.catID);
        $scope.bookdata = [];
        booksService.get().then(function (data) {
            $scope.data = data;
            for (var i = 0; i < data.length; i++) {
                if (data[i].cat_id == $scope.catID) {
                    $scope.bookdata.push(data[i]);
                }
            }

        });

    })
    .controller('BookDetailCtrl', function ($scope, $stateParams, booksService, fetchFromLocal) {
        $scope.catID = $stateParams.catID;
        $scope.bookID = $stateParams.bookID;
        $scope.bookdata = [];
        booksService.get().then(function (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i]._id == $stateParams.bookID) {
                    $scope.currentbook = data[i];
                }
            }
            if (fetchFromLocal.get($scope.bookID) == null) {
                $scope.ratingsObject.rating = $scope.currentbook.rating;
            }

        });
        $scope.isEmpty = function (obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop))
                    return false;
            }
            return true;
        };
        $scope.temprating = fetchFromLocal.get($scope.bookID);
        $scope.ratingsObject = {
            iconOn: 'ion-ios-star',
            iconOff: 'ion-ios-star-outline',
            iconOnColor: 'rgb(200, 200, 100)',
            iconOffColor: 'rgb(200, 100, 100)',
            rating: $scope.temprating,
            minRating: 1,
            callback: function (rating) {
                $scope.ratingsCallback(rating);
            }
        };

        $scope.ratingsCallback = function (rating) {
            console.log('Selected rating is : ', rating);
            fetchFromLocal.add(rating, $scope.bookID);
        };
    })

.controller('ProfileCtrl', function ($scope) {

});