/*jshint esversion: 6 */
const users = (function() {
    'use strict';
    let allUsers = [];

    function setUsers(usersArray = []) {
        allUsers = usersArray;
    }

    function getAllUsers() {
        return allUsers;
    }

    return {
        get: getAllUsers,
        set: setUsers
    }
}());