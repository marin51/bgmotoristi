/*jshint esversion: 6 */
const UserDetails = (function() {
    'use strict';

    function init(userId = null) {
        if (!userId) { Loading.hide(); return; }
        template.load('userDetails');

        let userData = Users.get().filter((user) => {
                return user.id === userId;
            })[0],
            allBookmarks = JSON.parse(localStorage.getItem('logged_user_bookmarks')) || [],
            isUserBookmarked,
            mainProfileHTML,
            sharedDataHTML,
            bookmarkHTML;

        if (allBookmarks.length && allBookmarks.includes(userId)) { isUserBookmarked = true; }

        mainProfileHTML = `
        <div class="main-profile-info">
            <div class="names-container">
                <div>
                    <p>${userData.firstName}</p>
                </div>
                <div>
                    <p>${userData.lastName}</p>
                </div>
            </div>
            <div class="image-container">
                ${userData.photo ? `<img class="preload-image" src="img/loading.svg" />` : `
                <div><i class="fal fa-user-circle"></i></div>`}
            </div>
        </div>`;

        sharedDataHTML = `
        <h5>Shared additional data</h5>
        <div class="sub-profile-info">
            ${userData.facebook ? `<div class="single-item" onclick='window.open("${validateLink(userData.facebook)}")'><div class="left"><i style="color:#4267B2" class="fab fa-facebook"></i></div> Facebook</div>` : ``}
            ${userData.instagram ? `<div class="single-item" onclick='window.open("${validateLink(userData.instagram)}")'><div class="left"><i style="background: rgb(88,81,219);padding: 1px 2px 0px 3px;border-radius: 2px;color: white;background: linear-gradient(145deg, rgba(64,93,230,1) 8%, rgba(88,81,219,1) 18%, rgba(131,58,180,1) 27%, rgba(193,53,132,1) 36%, rgba(225,48,108,1) 46%, rgba(253,29,29,1) 55%, rgba(245,96,64,1) 64%, rgba(247,119,55,1) 73%, rgba(252,175,69,1) 82%, rgba(255,220,128,1) 91%);" class="fab fa-instagram"></i></div> Instagram</div>` : ``}
            ${userData.skype ? `<div class="single-item"><div class="left"><i style="color:#00AFF0" class="fab fa-skype"></i></div> Skype name: ${userData.skype}</div>` : ``}
            ${userData.email ? `<div class="single-item" onclick='window.open("mailto:${userData.email}","_system")'><div class="left"><i class="fas fa-at"></i></div> Email</div>` : ``}
            ${userData.phone ? `<div class="single-item" onclick='window.open("tel:${userData.phone}","_system")'><div class="left"><i class="far fa-mobile-android"></i></div> Mobile</div>` : ``}
            ${userData.link ? `<div class="single-item" onclick='window.open("${validateLink(userData.link)}")'><div class="left"><i class="fas fa-link"></i></div> Shared link</div>` : ``}
        </div>`;

        bookmarkHTML = `
        <h5>Bookmark ${userData.firstName}  ${userData.lastName}</h5>
        <div class="bookmark-section">
           ${isUserBookmarked ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>'}
        </div>`;

        $($('#user-details-ons-page')[0])[0].content.querySelector('.main-container').innerHTML = mainProfileHTML;

        if (sharedDataHTML.indexOf('single-item') > -1) {
            $($('#user-details-ons-page')[0])[0].content.querySelector('.main-container').innerHTML += sharedDataHTML;
        }

        $($('#user-details-ons-page')[0])[0].content.querySelector('.main-container').innerHTML += bookmarkHTML

        Navigation.push('user-details-ons-page', 'fade-ios', controller);

        function controller() {
            Loading.hide();
            if ($('.user-details-page .main-container .image-container .preload-image').length) {
                $('.user-details-page .main-container .image-container .preload-image').attr('src', userData.photo);
            }

            $('.user-details-page .toolbar .toolbar-button').on('click', () => {
                $(this).off('click');
                if ($($('#myNavigator .page')[0]).hasClass('my-bookmarks-page')) {
                    MyBookmarks.refreshList();
                }
            });

            $('.bookmark-section i').on('click', function() {
                if ($(this).hasClass('fas')) {
                    $(this).fadeOut(250).removeClass('fas').fadeIn(250).addClass('far');
                    const newResult = allBookmarks.filter((bookmark) => {
                        if (bookmark !== userId) { return bookmark; }
                    });
                    allBookmarks = newResult;
                } else {
                    $(this).fadeOut(250).removeClass('far').fadeIn(250).addClass('fas');
                    allBookmarks.push(userId);
                }
                localStorage.setItem('logged_user_bookmarks', JSON.stringify(allBookmarks));
            });
        }

    }

    return {
        init: init
    };
}());