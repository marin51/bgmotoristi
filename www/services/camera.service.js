//jshint esversion: 6
const cameraApi = (function() {
    'use strict';


    function showCameraActionSheet() {

        return new Promise((resolve, reject) => {
            let actionSheetOptions = {
                cancelable: true,
                class: 'camera-api-options-sheet',
                buttons: [`Take Picture`, `Choose From Gallery`, `Cancel`]
            };

            function takePicture() {
                let cameraOptions = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    encodingType: Camera.EncodingType.JPEG,
                    correctOrientation: true,
                    targetWidth: 500,
                    targetHeight: 500,
                };
                navigator.camera.getPicture(onSuccess, onFail, cameraOptions);

                function onSuccess(imageData) { resolve(imageData); }

                function onFail(errMessage) { reject(errMessage); }
            }

            function getFromGallery() {
                let cameraOptions = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    encodingType: Camera.EncodingType.JPEG,
                    correctOrientation: true,
                    cameraDirection: 1,

                };
                navigator.camera.getPicture(onSuccess, onFail, cameraOptions);

                function onSuccess(imageData) { resolve(imageData); }

                function onFail(errMessage) { reject(errMessage); }
            }

            ons.openActionSheet(actionSheetOptions).then(function(index) {
                if (index === 0) {
                    takePicture();
                } else if (index === 1) {
                    getFromGallery();
                } else {

                }
            });
        });
    }
    return {
        showCameraActionSheet: showCameraActionSheet
    };
}());