/*jshint esversion: 6 */
const loadPage = function(pageId, animation, controller) {
    let appMenu = document.getElementById('menu'),
        appNavigator = document.getElementById('myNavigator'),
        anim = 'fade-ios';
    if (animation !== '') {
        anim = animation;
    }

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

const pushPage = function(page, anim, callbackFunction) {
    let appNavigator = document.getElementById('myNavigator'),
        pageAnimation = 'slide-ios';
    if (anim === '') { pageAnimation = 'slide-ios'; } else { pageAnimation = anim; }

    appNavigator.pushPage(page, {
        animation: pageAnimation,
        callback: callbackFunction,
        data: { moduleHash: page }
    });
};
const openMenu = function() {
    let appMenu = document.getElementById('menu');
    appMenu.open();
};
const popPage = function() {
    let appNavigator = document.getElementById('myNavigator');
    appNavigator.popPage({
        callback: function() {
            console.log('Pop page...');
        }
    })
};