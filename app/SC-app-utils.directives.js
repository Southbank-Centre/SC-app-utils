'use strict';

angular.module('SC-app-utils')
  /**
   * @ngdoc directive
   * @name SC-app-utils.directive:cssEqualHeight
   * @directive
   *
   * @description
   * To get the height of an adjacent element to create equal height columns
   * 
   * NB - not currently used - use css table-cell property instead if possible
   */
  .directive('scCssEqualHeight', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attr) {

        var elementToCopyProperty = attr.cssEqualHeight,
          source = document.getElementById(elementToCopyProperty.toString());
        // Set height
        element[0].style.maxHeight = source.clientHeight + 'px';
        
      }
    };
  })
  /**
   * @ngdoc directive
   * @name SC-app-utils.directive:lazy
   * @directive
   *
   * @description
   * Lazy load list pages images that have a class of 'lazy'
   * NB - add 'key-up-lazy' directive to any free text filter (see keyUpLazy)
   *
   */
  .directive('scLazy', function($timeout) {
    return {
      restrict: 'C',
      link: function (scope, element) {
        $timeout(function() { 
          element.lazyload({
              threshold : 300,
              effect : 'fadeIn'
          }); 
        }, 0); 
      }
    };
  });