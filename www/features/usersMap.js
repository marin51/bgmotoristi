/*jshint esversion: 6 */
const UsersMap = (function() {
    'use strict';

    function init() {

        template.load('usersMap');
        Navigation.load('users-map-ons-page', 'fade-ios', controller);

        function controller() {
            Loading.hide();
            let map;

            function initMap() {
                map = new google.maps.Map(document.getElementById("map"), {
                    center: { lat: -34.397, lng: 150.644 },
                    zoom: 8
                });
            }
            initMap();
            console.log('usersMap');
        }

    }

    return {
        init: init
    };
}());