/*jshint esversion: 6 */
const SocialWall = (function() {
    'use strict';

    function init() {

        template.load('socialWall');
        Navigation.load('social-wall-ons-page', 'fade-ios', controller);

        function controller() {
            Loading.hide();
            console.log('socialWall');
        }

    }

    return {
        init: init
    };
}());