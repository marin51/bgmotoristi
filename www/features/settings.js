/*jshint esversion: 6 */
const settings = (function() {
    'use strict';

    function init() {

        template.load('settings');
        navigation.push('settings-ons-page', 'slide-ios', controller);

        function controller() {
            console.log('settings');
        }

    }

    return {
        init: init
    }
}());