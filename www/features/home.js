/*jshint esversion: 6 */
const Home = (function() {
    'use strict';

    function init() {

        template.load('home');
        Navigation.load('home-ons-page', 'fade-ios', controller);

        function controller() {
            Loading.hide();
            console.log('home');
            if (!localStorage.getItem('logged_user_position') || localStorage.getItem('logged_user_position').timestamp < new Date().getTime - 6000000) {
                MapsService.getCurrentLocation();
            }

        }

    }

    return {
        init: init
    };
}());