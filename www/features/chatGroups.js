/*jshint esversion: 6 */
const ChatGroups = (function() {
    'use strict';

    function init() {

        template.load('chatGroups');
        Navigation.load('chat-groups-ons-page', 'fade-ios', controller);

        function controller() {
            Loading.hide();
            console.log('chatGroups');
        }

    }

    return {
        init: init
    };
}());