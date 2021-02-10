//jshint esversion: 6
function logout() {
    auth.signOut().then(() => {
        localStorage.clear();
        Login.init();
    });
}

function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {
        type: contentType
    });
    return blob;
}

function validateLink(link) {
    let validLink = '';
    if (link.indexOf('https://') === -1 && link.indexOf('http://') === -1) {
        validLink += `https://${link}`;
    } else {
        validLink = link;
    }
    return validLink;
}

$.fn.isInViewport = function() {
    if (this.length) {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight() - 40;
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        return elementBottom > viewportTop && elementTop < viewportBottom;
    }
};