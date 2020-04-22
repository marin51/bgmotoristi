//jshint esversion: 6
firebase.initializeApp({
    apiKey: "AIzaSyBsVhYm-kvHpFaAA4LeMuAE33lUyP-ETaA",
    authDomain: "bgmotoristi.firebaseapp.com",
    databaseURL: "https://bgmotoristi.firebaseio.com",
    projectId: "bgmotoristi",
    storageBucket: "bgmotoristi.appspot.com",
    messagingSenderId: "114109097623",
    appId: "1:114109097623:web:84e08f245bbf48a53f6bd2",
    measurementId: "G-QPS7XLB51K"
});

const database = (function() {

    function init() {
        firebase.analytics();
        auth = firebase.auth();
        db = firebase.firestore();
        storage = firebase.storage();
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
                users.set(usersArray);
            });
        });
    }

    function addImage(file) {
        return new Promise((resolve, reject) => {
            // Create the file metadata
            var metadata = {
                contentType: 'image/jpeg'
            };
            // Upload file and metadata to the object 'images/mountains.jpg'
            var uploadTask = storage.ref().child(`profile-images/${Math.floor(Math.random() * 10000)}_${file.name}`).put(file, metadata);
            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on('state_changed', // or firebase.storage.TaskEvent.STATE_CHANGED
                function(snapshot) {
                    switch (snapshot.state) {
                        case 'paused': // or firebase.storage.TaskState.PAUSED
                            Debug.log({
                                level: 1,
                                message: 'firebase.service => Upload is paused'
                            });
                            break;
                        case 'running': // or firebase.storage.TaskState.RUNNING
                            Debug.log({
                                level: 1,
                                message: 'firebase.service => Upload is running'
                            });
                            break;
                    }
                },
                function(error) {
                    reject(error);
                },
                function() {
                    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                        resolve(downloadURL);
                    }); // Upload completed successfully, now we can get the download URL
                });
        });

    }

    return {
        init: init,
        addImage: addImage
    };
}());