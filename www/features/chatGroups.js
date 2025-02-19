/*jshint esversion: 6 */
const ChatGroupsList = (function() {
    'use strict';

    let allGroupsArray = [],
        infiniteList = null,
        groupCollection = null;

    function init() {

        template.load('chatGroups');
        Navigation.load('chat-groups-ons-page', 'fade-ios', controller);

        function controller() {
            Loading.hide();
            groupCollection = ChatService.getRef();
            groupCollection.orderBy('name').get().then(function(groups) {
                allGroupsArray = [];
                if (groups.docs.length) {

                    for (var i = 0; i < groups.docs.length; i += 1) {
                        allGroupsArray.push(groups.docs[i].data());
                    }

                    if ($('.chat-groups-page .empty-image-outher').length) {
                        $('.chat-groups-page .main-container').html(` <ons-list class="groups-list"><ons-lazy-repeat id="groups-infinite-list"></ons-lazy-repeat></ons-list>`);
                    }

                    loadChatGroups();
                    setTimeout(() => { preloadImages(); }, 0);
                    Loading.hide();

                } else {
                    // TODO: show empty state;
                    $('.chat-groups-page .main-container').html(`<div class="empty-image-outher"><div class="empty-image-inner"><img src="img/empty-states/no_groups.svg"/><p>There are no chat groups! Add first group from plus button.</p></div></div>`);
                }

                $('#myNavigator .groups-list .list-item').on('click', function() {
                    Chat.init($(this).attr('data-id'));
                });
            });
            const pullHook = document.getElementById('pull-hook');
            pullHook.addEventListener('changestate', function(event) {
                let message = '';

                switch (event.state) {
                    case 'initial':
                        message = 'Pull to refresh';
                        break;
                    case 'preaction':
                        message = 'Release...';
                        break;
                    case 'action':
                        message = 'Loading';
                        break;
                }
                pullHook.innerHTML = message;
            });
            pullHook.onAction = function(done) {
                refreshList().then(() => {
                    $('#myNavigator .groups-list .list-item').on('click', function() {
                        Chat.init($(this).attr('data-id'));
                    });
                    done();
                }, error => {
                    console.log(error);
                    done();
                });


            };
        }
    }

    function preloadImages() {
        $.each($('.chat-groups-page .main-container img'), function(i, item) {
            $(item).attr('src', $(item).attr('data-src'));
        });
    }

    function loadChatGroups() {
        infiniteList = document.getElementById('groups-infinite-list');
        if (!allGroupsArray.length) {
            return;
        }
        infiniteList.delegate = {
            createItemContent: function(i) {
                return ons.createElement(buildListItemHTML(i));
            },
            countItems: function() {
                return allGroupsArray.length;
            }
        };
        infiniteList.refresh();
    }

    function buildListItemHTML(i) {
        return `
            <ons-list-item data-id="${allGroupsArray[i].id}">
                <div class="left">
                    <div class="image-container">
                        ${allGroupsArray[i].coverUrl ? `<img class="group-image" data-src="${allGroupsArray[i].coverUrl}" src="img/loading.svg" />` : `<i class="fal fa-motorcycle"></i>`}
                    </div>
                </div>
                <div class="center">
                    <span class="group-name">${allGroupsArray[i].name}</span>
                    <span class="group-description">${allGroupsArray[i].description ? allGroupsArray[i].description : ''}</span>
                </div>
            </ons-list-item>`;
    }


    function refreshList() {
        return new Promise((resolve, reject) => {
            groupCollection.orderBy('name').get().then(groups => {
                allGroupsArray = [];
                if (groups.docs.length) {
                    for (var i = 0; i < groups.docs.length; i += 1) {
                        allGroupsArray.push(groups.docs[i].data());
                    }
                    if ($('.chat-groups-page .empty-image-outher').length) {
                        $('.chat-groups-page .main-container').html(` <ons-list class="groups-list"><ons-lazy-repeat id="groups-infinite-list"></ons-lazy-repeat></ons-list>`);
                    }
                }
                loadChatGroups();
                setTimeout(() => { preloadImages(); }, 0);
                resolve('done!');
            }).catch(error => {
                reject(error);
            });
        });
    }

    return {
        init: init,
        getGroupById: function(id) {
            return allGroupsArray.filter(function(group) {
                return group.id === id;
            })[0] || {};
        },
        refreshList: refreshList
    };
}());
