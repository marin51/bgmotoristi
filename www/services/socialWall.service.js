/*jshint esversion: 6 */
const SocialWallService = (function() {
    'use strict';
    let socialWallRef;

    function getRef() {
        if (socialWallRef) {
            return socialWallRef;
        } else {
            socialWallRef = db.collection('social');
            return socialWallRef;
        }

    }

    function addPostWithImage(file, postData) {
        database.addImage(file, `social_wall/${Math.floor(Math.random() * 10000)}_${file.name}`).then(function(fileUrl) {

            const postRef = db.collection('social').doc();
            db.collection('social').doc(postRef.id).set(postData).then(function(success) {
                resolve(objectToAdd);
            }).catch(function(error) {
                console.log(error);
            });
        });
    }

    function likePost() {
        db.collection('social').doc(postData.id).update(postData).then(function(success) {

        }).catch(function(error) {
            console.log(error);
        });
    }

    function addPostWithOutImage(postData) {
        const postRef = db.collection('social').doc();
        db.collection('social').doc(postRef.id).set(postData).then(function(success) {
            resolve(objectToAdd);
        }).catch(function(error) {
            console.log(error);
        });
    }

    return {
        getRef: getRef,
        addPostWithImage: addPostWithImage,
        addPostWithOutImage: addPostWithOutImage,
        likePost: likePost
    }

}());