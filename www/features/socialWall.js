/*jshint esversion: 6 */
const SocialWall = (function() {
    'use strict';
    let allPostsArray = [],
        allUsersArray = [],
        infiniteList = null,
        postsCollection = null;

    function init() {
        let imageToUpload = null;
        allPostsArray = [];
        allUsersArray = [];
        postsCollection = null;
        template.load('socialWallPostsList');
        template.load('socialWallAddNewPost');
        template.load('socialWall');
        Navigation.load('social-wall-ons-page', 'fade-ios', controller);

        function controller() {

            $('.social-wall-tabbar').on('postchange', function(event) {

                switch (event.detail.activeIndex) {
                    case 0:
                        postsListController();
                        break;
                    case 1:
                        newPostController();
                        break;
                    default:
                        break;
                }
            });
            postsListController();

            function postsListController() {
                allUsersArray = Users.get();
                console.log('posts list controller');
                postsCollection = SocialWallService.getRef();

                postsCollection.orderBy("timestamp", "desc").onSnapshot(function(allPosts) {
                    allPostsArray = [];
                    for (var post in allPosts.docs) {
                        if (allPosts.docs.hasOwnProperty(post)) {
                            var element = allPosts.docs[post].data();
                            allPostsArray.push(element);
                        }
                    }

                    if (!allPosts.docs.length) {
                        //TODO: show empty state
                        return;
                    } else {
                        if ($('.social-wall-posts-list-page .empty-state-outer-container').length) {
                            $('.social-wall-posts-list-page .main-container').html('<ons-list class="post-list"><ons-lazy-repeat id="posts-infinite-list"></ons-lazy-repeat></ons-list>');
                        }
                    }


                    if ($('.social-wall-posts-list-page .single-post-container').length > 0) {
                        allPosts.docChanges().forEach(function(change) {
                            if (change.type === "added") {
                                if (change.doc.data().userId !== localStorage.getItem('logged_user_id')) {
                                    updateUnreadMessagesBadge();
                                }
                            }

                            if (change.type === "modified") {
                                updatePostData(change.doc.data());
                            }

                            if (change.type === "removed") {
                                deletePost(change.doc.data());
                            }

                        });
                    } else {
                        loadPosts(allPostsArray);
                        setControlls();
                        setTimeout(() => {
                            preloadImages();
                        }, 0);
                        Loading.hide();

                    }

                }, function(error) {
                    //TODO: show error message
                });




                function updatePostData(post) {
                    $('.post-activities-counter[data-id="' + post.id + '"] span').text(post.likedUsers.length);
                }

                function updateUnreadMessagesBadge() {
                    $('#social-wall-fab').removeClass('hide');
                    $('#social-wall-fab').on('click', function() {
                        $(this).off('click').addClass('hide');
                        if (infiniteList) {
                            Loading.show();
                            loadPosts();
                            preloadImages();
                            setControlls();
                            Loading.hide();
                            infiniteList.refresh();
                        }

                    });

                }

                function deletePost(post) {}

                function loadPosts() {
                    infiniteList = document.getElementById('posts-infinite-list');

                    if (infiniteList !== null) {
                        infiniteList.delegate = {
                            createItemContent: function(i) {
                                return ons.createElement(generatePostHtml(allPostsArray[i]));
                            },
                            countItems: function() {
                                return allPostsArray.length;
                            }
                        };
                        infiniteList.refresh();
                    }
                }

                function generatePostHtml(post) {
                    var postHTML = '',
                        postText = '',
                        currentUser = allUsersArray.filter(function(user) {
                            if (user.id === post.userId) { return user; }
                        })[0];

                    if (post.text.length) {
                        postText = post.text.replace(/\n/g, "<br>");
                    }

                    postHTML += `
                            <ons-card id="post-id-${post.id}" class="animated fadeIn single-post-container">
                            <ons-list-item class="post-title-container">
                                <div class="left">
                                    ${currentUser.photo ? `<img class="profile-image" data-src="${currentUser.photo}" src="img/loading.svg"/>` : `<i class="fal fa-user-circle"></i>`}
                               </div>
                               <div class="center">
                                  <div class="list-item__title"><b>${currentUser.firstName}</b></div>
                                  <div class="list-item__subtitle post-date-added">${new Date(post.timestamp).toLocaleString()}</div>
                               </div>
                            </ons-list-item>
                            <div class="post-content-container">
                               <div class="post-text-box">
                                  <p>${postText}</p>
                               </div>
                               ${post.imageUrl ? `
                               <div class="post-image"><img src="img/loading.svg" alt="Post image" data-src=${post.imageUrl}/></div>
                               ` : ``}
                            </div>
                            <ons-list-item class="post-button-bar post-activity-option-buttons" modifier="nodivider">
                                <div class="center">
                                    <div class="post-activities-counter" data-id="${post.id}">
                                        <span class="likes-number">${post.likedUsers.length}</span> ${post.likedUsers.indexOf(localStorage.getItem('logged_user_id')) > -1 ? `<i class="far fa-thumbs-down"></i> Likes` : `<i class="far fa-thumbs-up"></i> Likes`}
                                    </div>
                                </div>
                            </ons-list-item>
                         </ons-card>`;

                    return postHTML;
                }
            }

            function newPostController() {

                console.log('add new post contoroller');
                $('.social-wall-add-new-post-page .main-container .upload-image-button-container').off('click').on('click', function() {
                    CameraService.showCameraActionSheet().then(function(imageUrl) {
                        imageToUpload = b64toBlob(imageUrl);
                        imageToUpload.name = `image_${Date.now()}`;

                        $('.social-wall-add-new-post-page .main-container .upload-image-button-container').html(`<img class="post-image" src="data:image/jpeg;base64,${imageUrl}" />`);
                        $('.social-wall-add-new-post-page .main-container').addClass('uploaded-image');
                    }, function(error) {
                        console.log('error', error);
                    });
                });

                $('.social-wall-add-new-post-page .main-container #add-new-post-button').off('click').on('click', function() {
                    Loading.show();
                    const postText = $('.social-wall-add-new-post-page .main-container textarea').val() || '',
                        postImage = $('.social-wall-add-new-post-page .main-container .post-image').attr('src') || null;
                    if (!postText && !postImage) {
                        ons.notification.alert(`Oops! there is nothing to upload!`);
                        Loading.hide();
                        return;
                    }
                    if (postImage) {
                        SocialWallService.addPostWithImage(imageToUpload, postText).then(function(success) {
                            $('.social-wall-add-new-post-page .main-container textarea').val('');
                            $('.social-wall-add-new-post-page .main-container .upload-image-button-container').html(`<div class="upload-image-button-container"><div><i class="fal fa-camera-alt"></i></div></div>`);
                            Loading.hide();
                            document.querySelector('.social-wall-tabbar').setActiveTab(0);
                            if (infiniteList) {
                                infiniteList.refresh();
                                preloadImages();
                                setControlls();
                                $('.social-wall-posts-list-page').scrollTop(0);
                            }
                        }, function(error) {
                            Loading.hide();
                            ons.notification.toast({
                                message: error.message,
                                timeout: 2000
                            });
                        });
                    } else {
                        SocialWallService.addPostWithOutImage(postText).then(function(success) {
                            Loading.hide();
                            $('.social-wall-add-new-post-page .main-container textarea').val('');
                            document.querySelector('.social-wall-tabbar').setActiveTab(0);
                            if (infiniteList) {
                                infiniteList.refresh();
                                preloadImages();
                                setControlls();
                                $('.social-wall-posts-list-page').scrollTop(0);
                            }
                        }, function(error) {
                            Loading.hide();
                            ons.notification.toast({
                                message: error.message,
                                timeout: 2000
                            });
                        });
                    }
                });
            }

            function preloadImages() {
                $.each($('.social-wall-posts-list-page .main-container ons-card img'), function(i, item) {
                    $(item).attr('src', $(item).attr('data-src'));
                });
            }

            function setControlls() {
                $('.post-activities-counter').off('click').on('click', function() {
                    const postId = $(this).attr('data-id');
                    let post = allPostsArray.filter(function(post) {
                        if (post.id === postId) { return post; }
                    })[0];
                    var index = post.likedUsers.indexOf(localStorage.getItem('logged_user_id'));
                    if (index > -1) {
                        //dislike
                        post.likedUsers.splice(index, 1);
                    } else {
                        //like
                        post.likedUsers.push(localStorage.getItem('logged_user_id'));
                    }
                    SocialWallService.likePost(post);
                    $('.post-activities-counter[data-id="' + post.id + '"] i').toggleClass(`fa-thumbs-up fa-thumbs-down`);

                });
            }

        }

    }

    function destroy() {
        if (postsCollection !== null && typeof postsCollection === 'function') {
            postsCollection();
            postsCollection = null;
        }
    }

    return {
        init: init,
        destroy: destroy
    };
}());
