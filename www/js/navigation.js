/*jshint esversion: 6 */
const Navigation = (function () {
    'use strict';
    let currPageId = '';


    const loadPage = function (pageId, animation, controller) {
        if (currPageId === pageId) {
            return;
        }
        //remove firebase hook
        if (currPageId === 'social-wall-ons-page') {
            SocialWall.destroy();
        }
        if (currPageId !== 'chat-group-page') {
            Chat.destroy();
        }
        if (currPageId !== 'add-comment-page') {
            PostComments.destroy();
        }
        Loading.show();
        $('#menu').attr('swipeable', true);
        let appMenu = document.getElementById('menu'),
            appNavigator = document.getElementById('myNavigator'),
            anim = 'fade-ios';
        if (animation !== '') {
            anim = animation;
        }
        currPageId = pageId;
        appMenu.close();
        appNavigator.resetToPage(pageId, {
            animation: anim,
            animationOptions: {
                duration: 0.2,
                delay: 0,
                timing: 'ease-in'
            },
            callback: controller,
            data: {
                moduleHash: pageId
            }
        });

    };
    const pushPage = function (page, anim, callbackFunction) {
        Loading.show();
        let appNavigator = document.getElementById('myNavigator'),
            pageAnimation = 'slide-ios';
        if (anim === '') {
            pageAnimation = 'slide-ios';
        } else {
            pageAnimation = anim;
        }
        currPageId = page;
        document.getElementById('menu').close();
        appNavigator.pushPage(page, {
            animation: pageAnimation,
            callback: callbackFunction,
            data: {moduleHash: page}
        });
    };
    const openMenu = function () {
        let appMenu = document.getElementById('menu');
        appMenu.open();
    };
    const popPage = function () {
        let appNavigator = document.getElementById('myNavigator');
        let lastPage = appNavigator.pages[appNavigator.pages.length - 1];

        // clear chat hook
        if (lastPage.classList.value.indexOf('chat-group-page') > -1) {
            Chat.destroy();
        }
        if (lastPage.classList.value.indexOf('add-comment-page') > -1) {
            PostComments.destroy();
        }
        appNavigator.popPage({
            callback: function () {
                console.log('Pop page...');
            }
        })
    };

    return {
        load: loadPage,
        push: pushPage,
        openMenu: openMenu,
        pop: popPage
    }
}());
