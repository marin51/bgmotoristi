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

    function addPostWithImage(file, postText) {
        return new Promise(function(resolve, reject) {
            let postObject = {}
            Database.addImage(file, `social_wall/${Math.floor(Math.random() * 10000)}_${file.name}`).then(function(fileUrl) {
                const postRef = db.collection('social').doc();
                postObject.id = postRef.id;
                postObject.text = postText;
                postObject.userId = localStorage.getItem('logged_user_id');
                postObject.likedUsers = [];
                postObject.timestamp = new Date().getTime();
                postObject.imageUrl = fileUrl;

                db.collection('social').doc(postRef.id).set(postObject).then(function(success) {
                    resolve(success);
                }).catch(function(error) {
                    console.log(error);
                });
            });
        });

    }

    function likePost() {
        db.collection('social').doc(postData.id).update(postData).then(function(success) {

        }).catch(function(error) {
            console.log(error);
        });
    }

    function addPostWithOutImage(postText) {
        return new Promise(function(resolve, reject) {
            let postObject = {}
            const postRef = db.collection('social').doc();
            postObject.id = postRef.id;
            postObject.text = postText;
            postObject.userId = localStorage.getItem('logged_user_id');
            postObject.likedUsers = [];
            postObject.timestamp = new Date().getTime();
            db.collection('social').doc(postRef.id).set(postObject).then(function(success) {
                resolve(success);
            }).catch(function(error) {
                reject(error);
            });
        })

    }

    return {
        getRef: getRef,
        addPostWithImage: addPostWithImage,
        addPostWithOutImage: addPostWithOutImage,
        likePost: likePost
    }

}());