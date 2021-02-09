/*jshint esversion: 6 */
const SocialWallService = (function() {
    'use strict';
    let socialWallRef = null,
        postCommentsRef = null;

    function getRef() {
        if (socialWallRef) {
            return socialWallRef;
        } else {
            socialWallRef = db.collection('social');
            return socialWallRef;
        }
    }

    function getPostCommentsRef() {
        if (postCommentsRef) {
            return postCommentsRef;
        } else {
            postCommentsRef = db.collection('comments');
            return postCommentsRef;
        }
    }

    function addPostWithImage(file, postText) {
        return new Promise(function(resolve, reject) {
            let postObject = {};
            Database.addImage(file, `social_wall/${Math.floor(Math.random() * 10000)}_${file.name}`).then(function(fileUrl) {
                const postRef = getRef().doc();
                postObject.id = postRef.id;
                postObject.text = postText;
                postObject.userId = localStorage.getItem('logged_user_id');
                postObject.likedUsers = [];
                postObject.comments = 0;
                postObject.timestamp = new Date().getTime();
                postObject.imageUrl = fileUrl;

                getRef().doc(postRef.id).set(postObject).then(function(success) {
                    resolve(success);
                }).catch(function(error) {
                    console.log(error);
                });
            });
        });
    }

    function likePost(postData) {
        getRef().doc(postData.id).update(postData).then(function(success) {}).catch(function(error) {
            console.log(error);
        });
    }

    function addPostWithOutImage(postText) {
        return new Promise(function(resolve, reject) {
            let postObject = {};
            const postRef = getRef().doc();
            postObject.id = postRef.id;
            postObject.text = postText;
            postObject.userId = localStorage.getItem('logged_user_id');
            postObject.likedUsers = [];
            postObject.comments = 0;
            postObject.timestamp = new Date().getTime();

            getRef().doc(postRef.id).set(postObject).then(function(success) {
                resolve(success);
            }).catch(function(error) {
                reject(error);
            });
        });
    }

    function addPostComment(commentMessage, postId) {
        return new Promise(function(resolve, reject) {
            let commentObject = {};
            const postCommentRef = getPostCommentsRef().doc();
            const postRef = getRef().doc(postId);
            commentObject.id = postCommentRef.id;
            commentObject.postId = postId;
            commentObject.userId = localStorage.getItem('logged_user_id');
            commentObject.text = commentMessage;
            commentObject.timestamp = new Date().getTime();
            postRef.get().then(function(res) {
                getPostCommentsRef().doc(postCommentRef.id).set(commentObject).then(function(success) {
                    postRef.update({ comments: res.data().comments += 1 }).then(function(success) {
                        resolve(success);
                    }).catch(function(error) {
                        reject(error);
                    });
                }).catch(function(error) {
                    reject(error);
                });
            });

        });
    }

    return {
        getRef: getRef,
        getPostCommentsRef: getPostCommentsRef,
        addPostWithImage: addPostWithImage,
        addPostWithOutImage: addPostWithOutImage,
        likePost: likePost,
        addPostComment: addPostComment
    };
})();
