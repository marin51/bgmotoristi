/*jshint esversion: 6 */
const chatGroups = (function() {
    'use strict';

    function init() {

        template.load('chatGroups');
        navigation.load('chat-groups-ons-page', 'fade-ios', controller);

        function controller() {
            Loading.hide();
            console.log('chatGroups');
        }

    }

    return {
        init: init
    };
}());