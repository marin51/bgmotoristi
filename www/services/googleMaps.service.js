//jshint esversion: 6
const MapsService = (function() {
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
                if (localStorage.getItem('logged_user_deny_access_to_location')) {
                    localStorage.removeItem('logged_user_deny_access_to_location');
                }
                db.collection('coords').where("userId", "==", localStorage.getItem('logged_user_id')).limit(1).get().then(function(firebaseData) {

                    if (firebaseData.docs.length) {
                        let data = firebaseData.docs[0].data();
                        db.collection('coords').doc(data.id).update({
                            id: data.id,
                            userId: localStorage.getItem('logged_user_id'),
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            timestamp: position.timestamp || new Date().getTime
                        });
                        resolve('Success');
                    } else {
                        const ref = db.collection("coords").doc();
                        const userId = localStorage.getItem('logged_user_id') || null;
                        if (userId) {
                            db.collection('coords').doc(ref.id).set({
                                id: ref.id,
                                userId: localStorage.getItem('logged_user_id'),
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                                timestamp: position.timestamp || new Date().getTime
                            });
                            resolve('Success');
                        } else {
                            reject('Invalid user!');
                        }

                    }

                });
            }, function(error) {
                localStorage.setItem('logged_user_deny_access_to_location', 1);
                reject(error);
            });
        });
    }
    return {
        getCurrentLocation: getCurrentLocation
    };
}());
