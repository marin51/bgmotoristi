// jshint esversion:6
const MessagesService = (function() {
    'use strict';
    let MessagesRef;

    function getRef() {
        if (MessagesRef) {
            return MessagesRef;
        } else {
            MessagesRef = db.collection('messages');
            return MessagesRef;
        }
    }

    function addMessage(text, groupId) {
        return new Promise(function(resolve, reject) {
            let messageObject = {};
            const postRef = getRef().doc();
            messageObject.id = postRef.id;
            messageObject.groupId = groupId
            messageObject.text = text;
            messageObject.userId = localStorage.getItem('logged_user_id');
            messageObject.timestamp = new Date().getTime();

            getRef().doc(postRef.id).set(messageObject).then(function(success) {
                resolve(success);
            }).catch(function(error) {
                reject(error);
            });
        });
    }

    return {
        getRef: getRef,
        addMessage: addMessage,
        
    };
}());
