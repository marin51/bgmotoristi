// jshint esversion:6
const AddChat = (function() {
    'use strict';

    function init() {
        let imageToUpload = null;
        template.load('addChat');
        Navigation.push('add-chat-ons-page', 'fade-ios', controller);

        function controller() {

            Loading.hide();
            $('.add-chat-page #add-chat-group-button button').on('click', function() {
                const name = $('.add-chat-page #group-name').val(),
                    description = $('.add-chat-page #group-description').val(),
                    image = imageToUpload;

                if (isValid()) {
                    Loading.show();
                    if (image) {
                        ChatService.addGroupWithImage(image, name, description).then(() => {
                            ChatGroupsList.refreshList().then(() => {
                                Navigation.pop();
                                Loading.hide();
                            });
                        });
                    } else {
                        ChatService.addGroupWithoutImage(name, description).then(() => {
                            ChatGroupsList.refreshList().then(() => {
                                Navigation.pop();
                                Loading.hide();
                                setTimeout(function() { $('#myNavigator .groups-list .list-item').on('click', function() { Chat.init($(this).attr('data-id')); }); }, 0);
                            });
                        });
                    }
                } else {
                    ons.notification.toast({
                        message: 'Please, fill chat group name and description!',
                        timeout: 2000
                    });
                }

                function isValid() {
                    return !(!name.length || !description.length);

                }
            });

            $('.add-chat-page .upload-cover-image-button-container ons-button').on('click', function() {
                CameraService.showCameraActionSheet().then(function(imageUrl) {
                    imageToUpload = b64toBlob(imageUrl);
                    imageToUpload.name = `image_${Date.now()}`;

                    $('.add-chat-page .upload-cover-image-button-container').html(`<img class="cover-image" src="data:image/jpeg;base64,${imageUrl}" />`);
                    //$('.social-wall-add-new-post-page .main-container').addClass('uploaded-image');
                }, function(error) {
                    console.log('error', error);
                });
            });

        }
    }

    return {
        init: init
    }
}());
