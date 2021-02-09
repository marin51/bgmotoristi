// jshint esversion:6
const PostComments = (function() {
    'use strict';
    let commentsListener = null;
    function init(postId) {
      let allCommentsArray = [],
          allUsersArray = [];
        template.load('addPostComment');
        Navigation.push('add-post-comment-ons-page', 'fade-ios', controller);

        function controller() {
            Loading.hide();
            commentsListener = SocialWallService.getPostCommentsRef().where('postId', '==', postId).orderBy('timestamp', 'asc').onSnapshot(function (querySnapshot) {
                allCommentsArray = [];
                allUsersArray = Users.get();
                if (querySnapshot.docs.length) {
                    for (let i = 0; i < querySnapshot.docs.length; i += 1) {
                        let comment = querySnapshot.docs[i].data();
                        allCommentsArray.push(comment);
                    }
                    console.log(allCommentsArray);
                    if ($('.add-comment-page .empty-image-outher').length) {
                        $('.add-comment-page .main-container').html(`<div id="social-wall-comments-list"></div>`);
                    }
                } else {
                    $('.add-comment-page .main-container').html(`<div class="empty-image-outher"><div class="empty-image-inner"><img src="img/empty-states/no_messages.svg"/><p>There are no messages yet! Add some.</p></div></div>`);
                }

                if ($('.add-comment-page .single-comment-container').length > 0) {
                    querySnapshot.docChanges().forEach(function (change) {
                        if (change.type === "added") {
                            addNewComment(change.doc.data());
                            scrollListing();
                        }
                        if (change.type === "modified") {
                        }
                        if (change.type === "removed") {
                        }

                    });
                } else {
                    loadComments();
                    Loading.hide();
                }
            });
            function loadComments() {
                for (var i = 0; i < allCommentsArray.length; i += 1) {
                    addNewComment(allCommentsArray[i]);
                }
                scrollListing();
            }
            function addNewComment(comment) {
                let user = allUsersArray.filter((u) => {
                    if (u.id === comment.userId) {
                        return u;
                    }
                })[0];
                let commentHTML = `
                <div class="single-comment-container ${(comment.userId === localStorage.getItem('logged_user_id')) ? 'sender' : 'reciever'}">
                   <div class="comment-text">${comment.text}</div>
                   <div class="comment-sender">${user.photo ? `<img src="${user.photo}"/>` : '<i class="fal fa-user-circle"></i>'}  <span> ${user.firstName} ${user.lastName}</span></div>
                   <div class="comment-time">At ${new Date(comment.timestamp).toLocaleString()}</div>
                </div>`;
                $('.add-comment-page .main-container #social-wall-comments-list').append(commentHTML);
            }

            function scrollListing() {
                $('.add-comment-page').stop().animate({scrollTop: $('.add-comment-page')[0].scrollHeight}, 500);
            }

            $('.add-post-comment-form-container .send-comment-button-container').on('click', function () {
                const button = $(this);
                const text = $('.add-post-comment-form-container #add-comment-input').val();
                button.prop('disabled', true);
                if (text.length) {
                    SocialWallService.addPostComment(text, postId).then(function () {
                        $('.add-post-comment-form-container #add-comment-input').val('');
                        button.prop('disabled', false)
                    }, function (error) {
                        console.log('error', error);
                        ons.notification.alert({
                            message: 'Comment was not added, check your internet connection and try again, please.'
                        });
                    });
                }
            });
        }

    }

    function destroy() {
      if (commentsListener !== null && typeof commentsListener === 'function') {
          commentsListener();
          commentsListener = null;
      }
    }

    return {
        init: init,
        destroy: destroy
    }
}());
