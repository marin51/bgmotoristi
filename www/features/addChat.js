// jshint esversion:6
const addChat = (function() {
    'use strict';

    function init(id) {

        template.load('addChat');
        Navigation.push('add-chat-ons-page', 'fade-ios', controller);

        function controller() {
            Loading.hide();
            console.log('addChat');
        }

    }

    return {
        init: init
    }
}());
