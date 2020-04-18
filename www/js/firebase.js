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
const auth = firebase.auth();
const db = firebase.firestore();

auth.onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        console.log("User is signed in.");
        home.init();
    } else {
        // User is signed out.
        login.init();
    }
});