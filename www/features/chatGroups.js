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
            groupCollection.get().then(function(groups) {
                allGroupsArray = [];
                if (groups.docs.length) {

                    for (var i = 0; i < groups.docs.length; i += 1) {
                        allGroupsArray.push(groups.docs[i].data());
                    }

                    if ($('.chat-groups-page .empty-state-outer-container').length) {
                        $('.chat-groups-page .main-container').html('<ons-list class="groups-list"><ons-lazy-repeat id="posts-infinite-list"></ons-lazy-repeat></ons-list>');
                    }

                    loadChatGroups(allGroupsArray);
                    setTimeout(() => { preloadImages(); }, 0);
                    Loading.hide();

                } else {
                    // TODO: show empty state;
                }



            });
        }

        function preloadImages() {
            $.each($('.chat-groups-page .main-container img'), function(i, item) {
                $(item).attr('src', $(item).attr('data-src'));
            });
        }

        function loadChatGroups(groupsArray) {
            console.log('groupsArray', groupsArray);
        }

    }

    function destroy() {

    }

    return {
        init: init,
        destroy: destroy
    };
}());
