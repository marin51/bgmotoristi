/*jshint esversion: 6 */
const UsersMap = (function() {
    'use strict';

    function init() {
        template.load('usersMap');
        Navigation.load('users-map-ons-page', 'fade-ios', controller);

        function controller() {
            Loading.hide();
            let map,
                coords = JSON.parse(localStorage.getItem('logged_user_position')),
                currentLocationMarker;
            initMap();
            initMarker(coords.latitude, coords.longitude, "You are here!", coords.timestamp);

            function initMap() {
                map = new google.maps.Map(document.getElementById("map"), {
                    center: { lat: coords.latitude, lng: coords.longitude },
                    zoom: 15
                });
            }

            function initMarker(markerLatitude, markerLongitude, markerTitle, timePicked) {
                currentLocationMarker = new google.maps.Marker({
                    position: {
                        lat: markerLatitude,
                        lng: markerLongitude
                    },
                    animation: google.maps.Animation.DROP,
                    map: map,
                    title: markerTitle
                });

                currentLocationMarker.addListener('click', function() {
                    map.setCenter(currentLocationMarker.getPosition());
                    let infowindow = new google.maps.InfoWindow({
                        content: '<div class="map-popup">' + markerTitle + '<div>' + new Date(timePicked).toLocaleString() + '</div></div>',
                        position: currentLocationMarker.getPosition()
                    });
                    infowindow.open(map);
                });
            }
        }

    }

    return {
        init: init
    };
}());