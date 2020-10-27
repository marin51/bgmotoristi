/*jshint esversion: 6 */
const MyBookmarks = (function() {
    'use strict';
    let allUserIds,
        allUsers,
        infiniteList;

    function init() {
        allUserIds = JSON.parse(localStorage.getItem('logged_user_bookmarks')) || [];
        allUsers = Users.get();
        template.load('myBookmarks');
        Navigation.load('my-bookmarks-ons-page', 'fade-ios', controller);


        function controller() {
            Loading.hide();
            if (allUserIds.length) {
                buildUsersList();
            } else {
                $('.my-bookmarks-page .main-container').html(`<div class="empty-image-outher"><div class="empty-image-inner"><img src="img/empty-states/no_bookmarks.svg"></img><p>There are no bookmarked users! Bookmark some from details page.</p></div></div>`);
                return;
            }
            addClickEvents();
            preloadImages();

        }

        function buildUsersList() {
            infiniteList = document.getElementById('users-infinite-list');

            infiniteList.delegate = {
                createItemContent: function(i) {
                    return ons.createElement(buildListItemHTML(i));
                },
                countItems: function() {
                    return allUserIds.length;
                }
            };

            infiniteList.refresh();
        }

        function buildListItemHTML(i) {
            let currentUser = allUsers.filter((user) => {
                return user.id === allUserIds[i];
            })[0];
            return `
            <ons-list-item>
                <div class="left">
                    <div class="image-container">
                        ${currentUser.photo ? `<img class="profile-image" data-src="${currentUser.photo}" src="img/loading.svg"/>` : `<i class="fal fa-user-circle"></i>`}
                    </div>
                </div>
                <div class="center">
                    <span class="first-name">${currentUser.firstName}</span><span class="last-name">${currentUser.lastName}</span>
                </div>
                <div class="right" data-id="${currentUser.id}">
                      <span class="bookmark"><i class="fas fa-star"></i></span>
                      <span class="open-details"><i class="fal fa-info-square"></i></span>
                </div>
            </ons-list-item>`;
        }

    }

    function preloadImages() {
        setTimeout(function() {
            $.each($('#myNavigator .my-bookmarks-page .users-ons-list .list-item .left img'), function(i, item) {
                $(item).attr('src', $(item).attr('data-src'));
            });
        }, 0);
    }

    function addClickEvents() {
        $('#myNavigator .my-bookmarks-page .users-ons-list .list-item .right .open-details').on('click', function() {
            UserDetails.init($(this).parent().attr('data-id'));
        });

        $('#myNavigator .my-bookmarks-page .users-ons-list .list-item .right .bookmark').on('click', function() {
            const userId = $(this).parent().attr('data-id'),
                icon = $(this).find('i');
            let allBookmarks = JSON.parse(localStorage.getItem('logged_user_bookmarks')) || [];

            if (icon.hasClass('fas')) {
                icon.fadeOut(250).removeClass('fas').fadeIn(250).addClass('far');
                const newResult = allBookmarks.filter((bookmark) => {
                    if (bookmark !== userId) { return bookmark; }
                });
                allBookmarks = newResult;
            } else {
                icon.fadeOut(250).removeClass('far').fadeIn(250).addClass('fas');
                allBookmarks.push(userId);
            }
            localStorage.setItem('logged_user_bookmarks', JSON.stringify(allBookmarks));
        });
    }

    function refreshList() {
        allUserIds = JSON.parse(localStorage.getItem('logged_user_bookmarks')) || [];
        if (allUserIds.length && infiniteList) {
            infiniteList.refresh();
            preloadImages();
            addClickEvents();
        } else {
            $('.my-bookmarks-page .main-container').html(`<div class="empty-image-outher"><div class="empty-image-inner"><img src="img/empty-states/no_bookmarks.svg"></img><p>There are no bookmarked users! Bookmark some from details page.</p></div></div>`);
            return;
        }

    }

    return {
        init: init,
        refreshList: refreshList
    };
}());