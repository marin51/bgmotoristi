/*jshint esversion: 6 */
const userDetails = (function() {
    'use strict';

    function init(userId = null) {
        if (!userId) { Loading.hide(); return; }
        template.load('userDetails');

        let userData = users.get().filter((user) => {
                return user.id === userId;
            })[0],
            detailsHTML = `
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
                    ${userData.photo?`<img class="preload-image" src="img/loading.svg" />` :`
                    <div><i class="fal fa-user-circle"></i></div>`}
                </div>
            </div>
            <h5>Shared additional data</h5>
            <div class="sub-profile-info">
                  ${userData.facebook?`<div class="single-item" onclick='window.open("${validateLink(userData.facebook)}")'><div class="left"><i style="color:#4267B2" class="fab fa-facebook"></i></div> Facebook</div>` :``}
                  ${userData.instagram?`<div class="single-item" onclick='window.open("${validateLink(userData.instagram)}")'><div class="left"><i style="background: rgb(88,81,219);padding: 1px 2px 0px 3px;border-radius: 2px;color: white;background: linear-gradient(145deg, rgba(64,93,230,1) 8%, rgba(88,81,219,1) 18%, rgba(131,58,180,1) 27%, rgba(193,53,132,1) 36%, rgba(225,48,108,1) 46%, rgba(253,29,29,1) 55%, rgba(245,96,64,1) 64%, rgba(247,119,55,1) 73%, rgba(252,175,69,1) 82%, rgba(255,220,128,1) 91%);" class="fab fa-instagram"></i></div> Instagram</div>` :``}
                  ${userData.skype?`<div class="single-item"><div class="left"><i style="color:#00AFF0" class="fab fa-skype"></i></div> Skype name: ${userData.skype}</div>` :``}
                  ${userData.email?`<div class="single-item" onclick='window.open("mailto:${userData.email}","_system")'><div class="left"><i class="fas fa-at"></i></div> Email</div>` :``}
                  ${userData.link?`<div class="single-item" onclick='window.open("${validateLink(userData.link)}")'><div class="left"><i class="fas fa-link"></i></div> Shared link</div>` :``}
            </div>`;

        $($('#user-details-ons-page')[0])[0].content.querySelector('.main-container').innerHTML = detailsHTML;

        navigation.push('user-details-ons-page', 'fade-ios', controller);

        function controller() {

            if (!$('.user-details-page .main-container .sub-profile-info').text().trim().length) {
                $('.user-details-page .main-container .sub-profile-info').html('<div class="empty-image-outher"><div class="empty-image-inner"><img src="img/empty-states/no_user_data.svg"></img><p>There is not shared information yet.</p></div></div>')
            }
            Loading.hide();
            if ($('.user-details-page .main-container .image-container .preload-image').length) {
                $('.user-details-page .main-container .image-container .preload-image').attr('src', userData.photo);
            }

            console.log('details ' + userId);
        }

    }

    return {
        init: init
    };
}());