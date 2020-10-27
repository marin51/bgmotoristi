// jshint esversion:6
const AddChat = (function () {
    'use strict';

    function init() {
        let imageToUpload = null;
        template.load('addChat');
        Navigation.push('add-chat-ons-page', 'fade-ios', controller);

        function controller() {

            Loading.hide();
            $('.add-chat-page #add-chat-group-button button').on('click', function () {
                const name = $('.add-chat-page #group-name').val(),
                    description = $('.add-chat-page #group-description').val(),
                    image = imageToUpload;

                if (isValid()) {
                    if (image) {
                        ChatService.addGroupWithImage(image, name, description).then(() => {
                            ChatGroupsList.refreshList().then(() => {
                                Navigation.pop();
                            });
                        });
                    } else {
                        ChatService.addGroupWithoutImage(name, description).then(() => {
                            ChatGroupsList.refreshList().then(() => {
                                Navigation.pop();
                            });
                        });
                    }
                }

                function isValid() {
                    return !(!name.length || !description.length);

                }
            });

            $('.add-chat-page .upload-cover-image-button-container ons-button').on('click', function () {
                CameraService.showCameraActionSheet().then(function (imageUrl) {
                    imageToUpload = b64toBlob(imageUrl);
                    imageToUpload.name = `image_${Date.now()}`;

                    $('.add-chat-page .upload-cover-image-button-container').html(`<img class="cover-image" src="data:image/jpeg;base64,${imageUrl}" />`);
                    //$('.social-wall-add-new-post-page .main-container').addClass('uploaded-image');
                }, function (error) {
                    console.log('error', error);
                });
            });

        }
    }

    return {
        init: init
    }
}());
