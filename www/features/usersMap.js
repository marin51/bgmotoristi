/*jshint esversion: 6 */
const usersMap = (function() {
    'use strict';

    function init() {

        template.load('usersMap');
        navigation.load('users-map-ons-page', 'fade-ios', controller);

        function controller() {
            Loading.hide();
            console.log('usersMap');
        }

    }

    return {
        init: init
    };
}());