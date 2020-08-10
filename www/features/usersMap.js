/*jshint esversion: 6 */
const UsersMap = (function() {
    'use strict';

    function init() {

        template.load('usersMap');
        Navigation.load('users-map-ons-page', 'fade-ios', controller);

        function controller() {
            Loading.hide();
            console.log('usersMap');
        }

    }

    return {
        init: init
    };
}());