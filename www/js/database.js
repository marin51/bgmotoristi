//jshint esversion: 6
const database = (function() {

    function init() {
        const firebaseConfig = {
            apiKey: "AIzaSyBsVhYm-kvHpFaAA4LeMuAE33lUyP-ETaA",
            authDomain: "bgmotoristi.firebaseapp.com",
            databaseURL: "https://bgmotoristi.firebaseio.com",
            projectId: "bgmotoristi",
            storageBucket: "bgmotoristi.appspot.com",
            messagingSenderId: "114109097623",
            appId: "1:114109097623:web:84e08f245bbf48a53f6bd2",
            measurementId: "G-QPS7XLB51K"
        };
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();

        auth = firebase.auth();
        db = firebase.firestore();
        auth.onAuthStateChanged(function(user) {

            if (user) {
                // User is signed in.
                console.log("User is signed in.");
                console.log('user', user);
                home.init();
            } else {
                // User is signed out.
                login.init();
            }

            db.collection('users').onSnapshot(function(querySnapshot) {
                let usersArray = [];
                for (let i = 0; i < querySnapshot.docs.length; i += 1) {
                    let userData = querySnapshot.docs[i].data();
                    userData.id = querySnapshot.docs[i].id;
                    console.log('userData', userData);
                    usersArray.push(userData);
                }
                console.log('usersArray', usersArray);
                users.set(usersArray);
            });
        });
    }

    return {
        init: init
    }
}());