/*jshint esversion: 6 */
const UsersList = (function() {
    'use strict';

    function init() {
        let allUsers = Users.get();


        template.load('usersList');
        Navigation.load('users-list-ons-page', 'fade-ios', controller);

        function controller() {
            Loading.hide();
            if (allUsers.length) {
                buildUsersList();
            } else {
                return;
            }

            setTimeout(function() {
                $.each($('#myNavigator .users-list-page .users-ons-list .list-item .left img'), function(i, item) {
                    $(item).attr('src', $(item).attr('data-src'));
                });
            }, 0);

            $('#myNavigator .users-list-page .users-ons-list .list-item .right').on('click', function() {
                UserDetails.init($(this).attr('data-id'));
            });

        }

        function buildUsersList() {
            var infiniteList = document.getElementById('users-infinite-list');

            infiniteList.delegate = {
                createItemContent: function(i) {
                    return ons.createElement(buildListItemHTML(i));
                },
                countItems: function() {
                    return allUsers.length;
                }
            };

            infiniteList.refresh();
        }

        function buildListItemHTML(i) {
            return `
            <ons-list-item>
                <div class="left">
                    <div class="image-container">
                        ${allUsers[i].photo ? `<img class="profile-image" data-src="${allUsers[i].photo}" src="img/loading.svg"/>` : `<i class="fal fa-user-circle"></i>`}
                    </div>
                </div>
                <div class="center">
                    <span class="first-name">${allUsers[i].firstName}</span><span class="last-name">${allUsers[i].lastName}</span>
                </div>
                <div class="right" data-id="${allUsers[i].id}">
                        <i class="fal fa-info-square"></i>
                </div>
            </ons-list-item>`;
        }

    }

    return {
        init: init
    };
}());