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
                    });
                } else {
                    ons.notification.alert('It seems you have to give permission from settings. Go to settings and allow to use location!');
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
                usersArray = Users.get(),
                markersArray = Coordinates.get().filter((coords) => {
                    if (coords.userId !== localStorage.getItem('logged_user_id')) { return coords; };
                });
            loadMap();
            $('#menu').removeAttr('swipeable');

            document.querySelector('.toolbar .right').addEventListener('click', function() {
                MapsService.getCurrentLocation().then(function() {
                    coords = JSON.parse(localStorage.getItem('logged_user_position'));
                    usersArray = Users.get();
                    markersArray = Coordinates.get().filter((coords) => {
                        if (coords.userId !== localStorage.getItem('logged_user_id')) { return coords; };
                    });
                    loadMap();
                }, function() {
                    ons.notification.alert('It seems you have to give permission from settings. Go to settings and allow to use location!');
                });
            });

            function loadMap() {
                initMap();
                initMarker(coords.latitude, coords.longitude, "You are here!", coords.timestamp, 1);
                //another users position
                if (markersArray.length) {
                    for (let i = 0; i < markersArray.length; i++) {
                        let userData = usersArray.filter((user) => {
                            if (user.id === markersArray[i].userId) { return user; };
                        })[0];
                        initMarker(markersArray[i].latitude, markersArray[i].longitude, `<span onclick="UserDetails.init('${userData.id}')">${userData.firstName}</span> was here at `, markersArray[i].timestamp)
                    }
                }
            }

            function initMap() {
                map = new google.maps.Map(document.getElementById("map"), {
                    center: { lat: coords.latitude, lng: coords.longitude },
                    zoom: 12
                });
            }

            function initMarker(markerLatitude, markerLongitude, markerTitle, timePicked, currentUser) {

                let currentLocationMarker,
                    markerIcon,
                    markersArray = [
                        'img/map/helmet-red.svg',
                        'img/map/helmet-blue.svg',
                        'img/map/helmet-green.svg',
                        'img/map/helmet-black.svg',
                        'img/map/helmet-violet.svg',
                        'img/map/helmet-white.svg',
                        'img/map/helmet-yellow.svg',
                    ];
                if (currentUser === 1) {
                    markerIcon = markersArray[0];
                } else {
                    markerIcon = markersArray[Math.floor(Math.random() * 6)];
                    if (!markerIcon) { markerIcon = markersArray[6]; }
                }

                currentLocationMarker = new google.maps.Marker({
                    position: {
                        lat: markerLatitude,
                        lng: markerLongitude
                    },
                    animation: google.maps.Animation.DROP,
                    map: map,
                    title: markerTitle,
                    icon: new google.maps.MarkerImage(
                        markerIcon,
                        new google.maps.Size(30, 30),
                        new google.maps.Point(0, 0),
                        new google.maps.Point(15, 15),
                        new google.maps.Size(30, 30))
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
