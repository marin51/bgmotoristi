/*jshint esversion: 6 */
const login = (function() {
    'use strict';

    function init() {

        template.load('login');
        navigation.load('login-ons-page', 'fade-ios', controller);

        function controller() {
            $('#menu').removeAttr('swipeable');
        }

    }

    return {
        init: init
    }
}());