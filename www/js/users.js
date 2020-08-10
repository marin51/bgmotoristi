/*jshint esversion: 6 */
const Users = (function() {
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