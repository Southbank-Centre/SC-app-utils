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
   * NB - add 'sc-key-up-lazy' directive to any free text filter (see scKeyUpLazy)
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
  })
  /**
   * @ngdoc directive
   * @name SC-app-utils.directive:keyUpLazy
   * @directive
   *
   * @description
   * Triggers scroll on keydown so that lazy-loaded images load
   *
   */
  .directive('scKeyUpLazy', function() {
    return {
      restrict: 'A',
      link: function (scope, element) {
        element.on('keyup', function() {
          angular.element('html,body').scroll();
        });
      }
    };
  })
  /**
   * @ngdoc directive
   * @name SC-app-utils.directive:scrollPosition
   * @directive
   *
   * @description
   * Adds the scroll position to the scope to allow for scroll events (eg show/hide element)
   *
   */
  .directive('scScrollPosition', function($window) {
    return {
      scope: {
        scroll: '=scScrollPosition'
      },
      link: function(scope) {
        var windowEl = angular.element($window);
        var handler = function() {
          scope.scroll = windowEl.scrollTop();
        };
        windowEl.on('scroll', scope.$apply.bind(scope, handler));
        handler();
      }
    };
  });