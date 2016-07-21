(function () {
    'use strict';

    angular
        .module('thinkster.posts.controllers')
        .controller('PostsController', PostsController);

    PostsController.$inject = ['$scope'];


    function PostsController($scope) {
        var vm = this;

        vm.columns = [];

        activate();

        function activate() {
            // posts are not set on scope in controller but they are set on scope in
            // directive via "<posts posts="vm.posts ..."
            $scope.$watchCollection(function() { return $scope.posts; }, render);
            $scope.$watch(function() { return $(window).width(); }, render);
        }

        function render(currentPosts, originalPosts) {
            var i, column;

            if (currentPosts != originalPosts) {
                vm.columns = [];

                for (i = 0; i < calculateNumberOfColumns(); i++) {
                    vm.columns.push([]);
                }

                for (i = 0; i < currentPosts.length; i++) {
                    column = aproximateShortestColumn();

                    vm.columns[column].push(currentPosts[i]);
                }
            }
        }

        function calculateNumberOfColumns() {
            var width = $(window).width();

            if (width >= 1200) {
                return 4;
            } else if (width >= 992) {
                return 3;
            } else if (width >= 768) {
                return 2;
            } else {
                return 1;
            }
        }

        function aproximateShortestColumn() {
            var columnHeights = vm.columns.map(getColumnHeight);

            return columnHeights.indexOf(Math.min.apply(this, columnHeights));

            function getColumnHeight(column) {
                var lengths = column.map(function(element) {
                    return element.content.length;
                });

                // we multiply by column.length because every post takes some additional space
                // and column.length is post count in column
                return lengths.reduce(sum, 0) * column.length;
            }

            function sum(a, b) {
                return a + b;
            }
        }
    }
})();
