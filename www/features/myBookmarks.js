/*jshint esversion: 6 */
const myBookmarks = (function() {
    'use strict';

    function init() {

        template.load('myBookmarks');
        navigation.load('my-bookmarks-ons-page', 'fade-ios', controller);

        function controller() {
            Loading.hide();
            console.log('myBookmarks');
        }

    }

    return {
        init: init
    };
}());