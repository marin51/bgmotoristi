/*jshint esversion: 6 */
const login = (function() {
    'use strict';

    function init() {

        template.load('login');
        navigation.load('login-ons-page', 'fade-ios', controller);

        function controller() {
            $('#menu').removeAttr('swipeable');
            let signUpForm = document.getElementById('sign-up-form'),
                loginForm = document.getElementById('login-form');
            //signUp
            signUpForm.addEventListener('submit', (e) => {
                e.preventDefault();
                let email = signUpForm['sign-up-email'].value;
                let password = signUpForm['sign-up-password'].value;
                auth.createUserWithEmailAndPassword(email, password).then((cred) => {
                    return db.collection('users').doc(cred.user.uid).set({
                        firstName: signUpForm['sign-up-first-name'].value,
                        lastName: signUpForm['sign-up-last-name'].value
                    }).then(() => {
                        home.init();
                    });
                }).catch((error) => {
                    ons.notification.alert({
                        message: error.message
                    });
                });
            });
            $('#go-to-register').on('click', () => {
                $('.login-form-container').addClass('hide');
                $('.sign-up-form-container').removeClass('hide');
            });

            $('#back-to-login').on('click', () => {
                $('.sign-up-form-container').addClass('hide');
                $('.login-form-container').removeClass('hide');
            });

            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                let email = signUpForm['sign-up-email'].value;
                let password = signUpForm['sign-up-password'].value;
                auth.signInWithEmailAndPassword(email, password);
            });
        }

    }

    return {
        init: init
    };
}());