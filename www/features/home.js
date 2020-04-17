/*jshint esversion: 6 */
const home = (function() {
    'use strict';

    function init() {


        function controller() {
            console.log(1);
        }

        loadPage('home-ons-page', '', controller);
    }

    return {
        init: init
    }
}());