/*jshint esversion: 6 */
const Settings = (function() {
    'use strict';

    function init() {
        var imageToupdate;
        template.load('settings');

        let userData = Users.get().filter((user) => {
                return user.id === localStorage.getItem('logged_user_id');
            })[0],
            containerHTML = ``;

        containerHTML += `<h5>Main Profile Info </h5>
                              <div class="main-profile-info">
                                  <div class="names-container">
                                      <div>
                                          <input data-id="firstName" type="text" class="text-input text-input--underbar" placeholder="First Name" value="${userData.firstName}" />
                                      </div>
                                      <div>
                                          <input data-id="lastName" type="text" class="text-input text-input--underbar" placeholder="Last Name" value="${userData.lastName}" />
                                      </div>
                                  </div>
                                  <div class="image-container">
                                      ${userData.photo ? `<img class="preload-image" src="img/loading.svg" />` : `
                                      <div><i class="fal fa-camera-alt"></i></div>`}
                                  </div>
                              </div>                          `;
        containerHTML += `<h5>Addition Info </h5>`;
        containerHTML += `<div class="additional-data-container">`;

        containerHTML += `<div><input data-id="email" type="email" class="text-input text-input--underbar" placeholder="Email" value="${userData.email ? userData.email : ''}"/></div>`;
        containerHTML += `<div><input data-id="facebook" type="text" class="text-input text-input--underbar" placeholder="Facebook" value="${userData.facebook ? userData.facebook : ''}"/></div>`;
        containerHTML += `<div><input data-id="instagram" type="text" class="text-input text-input--underbar" placeholder="Instagram" value="${userData.instagram ? userData.instagram : ''}"/></div>`;
        containerHTML += `<div><input data-id="phone" type="tel" pattern="[0-9]{10}" maxlength="10" minlength="10" class="text-input text-input--underbar" placeholder="Phone" value="${userData.phone ? userData.phone : ''}"/></div>`;
        containerHTML += `<div><input data-id="skype" class="text-input text-input--underbar" placeholder="Skype" value="${userData.skype ? userData.skype : ''}"/></div>`;
        containerHTML += `<div><input data-id="link" class="text-input text-input--underbar" placeholder="Web link" value="${userData.link ? userData.link : ''}"/></div>`;

        containerHTML += `<div class="button-container"><button id="save-profile-button" class="button">Save</button></div>`;
        containerHTML += `</div>`;

        $($('#settings-ons-page')[0])[0].content.querySelector('.main-container').innerHTML = containerHTML;
        Navigation.push('settings-ons-page', 'slide-ios', controller);

        function controller() {
            Loading.hide();

            if ($('.settings-page .main-container .image-container .preload-image').length) {
                $('.settings-page .main-container .image-container .preload-image').attr('src', userData.photo);
            }

            $('.settings-page .main-container .image-container').on('click', function() {
                CameraService.showCameraActionSheet().then(function(imageUrl) {
                    imageToupdate = b64toBlob(imageUrl);
                    imageToupdate.name = `image_${Date.now()}`;

                    $('.settings-page .main-container .image-container').html(`<img src="data:image/jpeg;base64,${imageUrl}" />`);
                }, function(error) {
                    console.log('error');
                });
            });

            $('.settings-page .main-container #save-profile-button').on('click', function() {
                Loading.show();
                let profileInfo = {};
                $.each($('.settings-page .main-container input'), function(i, item) {
                    if (item.value.length) {
                        profileInfo[item.getAttribute('data-id')] = item.value;
                    }
                });
                if ($('.settings-page .main-container .image-container img').length) {
                    profileInfo.photo = $('.settings-page .main-container .image-container img').attr('src');
                }
                if (JSON.stringify(profileInfo) !== JSON.stringify(userData)) {
                    if (profileInfo.photo !== userData.photo) {
                        Database.addImage(imageToupdate).then(function(photoUrl) {
                            profileInfo.photo = photoUrl;
                            updateUserProfileData();
                        });
                    } else {
                        updateUserProfileData();
                    }
                }

                function updateUserProfileData() {
                    db.collection('users').doc(localStorage.getItem('logged_user_id')).update(profileInfo).then(() => {
                        ons.notification.toast({
                            message: 'Successfully updated profile data',
                            timeout: 2000
                        });
                        Loading.hide();
                    }).catch((error) => {
                        ons.notification.alert({
                            message: error.message
                        });
                        Loading.hide();
                    });
                }
            });

        }

    }

    return {
        init: init
    };
}());
