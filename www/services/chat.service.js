// jshint esversion:6
const ChatService = (function() {
    'use strict';
    let chatGroupsRef;

    function getRef() {
        if (chatGroupsRef) {
            return chatGroupsRef;
        } else {
            chatGroupsRef = db.collection('chat_groups');
            return chatGroupsRef;
        }
    }

    function addGroupWithImage(file, name, description) {
        return new Promise(function(resolve, reject) {
            let postObject = {};
            Database.addImage(file, `chat_groups/${Math.floor(Math.random() * 10000)}_${file.name}`).then(function(fileUrl) {
                const postRef = getRef().doc();
                postObject.id = postRef.id;
                postObject.name = name;
                postObject.description = description;
                postObject.coverUrl = fileUrl;
                postObject.createdBy = localStorage.getItem('logged_user_id');


                getRef().doc(postRef.id).set(postObject).then(function(success) {
                    resolve(success);
                }).catch(function(error) {
                    reject(error);
                });
            });
        });
    }



    function addGroupWithoutImage(name, description) {
        return new Promise(function(resolve, reject) {
            let postObject = {};
            const postRef = getRef().doc();
            postObject.id = postRef.id;
            postObject.name = name;
            postObject.description = description;
            postObject.createdBy = localStorage.getItem('logged_user_id');
            postObject.coverUrl = null;

            getRef().doc(postRef.id).set(postObject).then(function(success) {
                resolve(success);
            }).catch(function(error) {
                reject(error);
            });
        });
    }

    return {
        getRef: getRef,
        addGroupWithImage: addGroupWithImage,
        addGroupWithoutImage: addGroupWithoutImage,
    };
}());
