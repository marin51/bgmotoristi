/*jshint esversion: 6 */
const Home = (function() {
    'use strict';

    function init() {

        template.load('home');
        Navigation.load('home-ons-page', 'fade-ios', controller);

        function controller() {
            Loading.hide();
            console.log('home');
        }

    }

    return {
        init: init
    };
}());