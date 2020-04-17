/*jshint esversion: 6 */
const home = (function() {
    'use strict';

    function init() {

        template.load('home');
        navigation.load('home-ons-page', 'fade-ios', controller);

        function controller() {
            console.log('home');
        }

    }

    return {
        init: init
    }
}());