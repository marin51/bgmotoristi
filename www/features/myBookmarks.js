/*jshint esversion: 6 */
const MyBookmarks = (function() {
    'use strict';

    function init() {

        template.load('myBookmarks');
        Navigation.load('my-bookmarks-ons-page', 'fade-ios', controller);

        function controller() {
            Loading.hide();
            console.log('myBookmarks');
        }

    }

    return {
        init: init
    };
}());