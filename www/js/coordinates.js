/*jshint esversion: 6 */
const Coordinates = (function() {
    'use strict';
    let allCoordinates = [];

    function setCoords(coordsArray = []) {
        allCoordinates = coordsArray;
    }

    function getCoords() {
        return allCoordinates;
    }

    return {
        get: getCoords,
        set: setCoords
    }
}());