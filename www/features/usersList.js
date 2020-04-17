/*jshint esversion: 6 */
const usersList = (function() {
    'use strict';

    function init() {

        template.load('usersList');
        navigation.load('users-list-ons-page', 'fade-ios', controller);

        function controller() {
            console.log('usersList');
        }

    }

    return {
        init: init
    }
}());