var MapsService = (function() {
    'use strict';

    function getCurrentLocation() {
        return new Promise(function(resolve, reject) {
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
                resolve('Success');
            }, function(error) {
                alert(error);
                localStorage.setItem('logged_user_deny_access_to_location', 1);
                reject(error);
            });
        });

    }
    return {
        getCurrentLocation: getCurrentLocation
    };
}());