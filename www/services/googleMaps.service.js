var MapsService = (function() {
    'use strict';

    function getCurrentLocation() {
        navigator.geolocation.getCurrentPosition(function(position) {
            localStorage.setItem('logged_user_position', JSON.stringify({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                altitude: position.coords.altitude,
                accuracy: position.coords.accuracy,
                altitudeAccuracy: position.coords.altitudeAccuracy,
                heading: position.coords.heading,
                speed: position.coords.heading,
                timestamp: position.timestamp
            }));
        }, function(error) {
            alert(error);
        });
    }
    return {
        getCurrentLocation: getCurrentLocation
    };
}());