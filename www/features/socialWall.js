/*jshint esversion: 6 */
const socialWall = (function() {
    'use strict';

    function init() {

        template.load('socialWall');
        navigation.load('social-wall-ons-page', 'fade-ios', controller);

        function controller() {
            console.log('socialWall');
        }

    }

    return {
        init: init
    }
}());