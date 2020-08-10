/*jshint esversion: 6 */
const UsersMap = (function() {
    'use strict';

    function init() {
        if (localStorage.getItem('logged_user_deny_access_to_location') == 1 || !localStorage.getItem('logged_user_position')) {
            ons.notification.alert({
                message: 'Please share your location first',
                title: 'Oops!',
                buttonLabels: ['Cancel', 'OK'],
                primaryButtonIndex: 1
            }).then(function(btnIndex) {
                if (btnIndex === 1) {
                    MapsService.getCurrentLocation().then(function() {
                        loadModule();
                    }, function(error) {
                        ons.notification.alert('It seems you have to give permission from settings. Go to settings and allow to use location!');
                        return;
                    });
                } else {
                    ons.notification.alert('It seems you have to give permission from settings. Go to settings and allow to use location!');
                    return;
                }
            });
        } else {
            loadModule();
        }

        function loadModule() {
            template.load('usersMap');
            Navigation.load('users-map-ons-page', 'fade-ios', controller);
        }

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