var Loading = (function() {

    var loadingModal,
        loadingModalHTML = '';

    loadingModalHTML += '<ons-modal id="loading-modal-template" direction="up">';
    loadingModalHTML += '<div class="container-outer"><div class="container-inner">';
    loadingModalHTML += '<div class="icon-box"><i class="fal fa-tire fa-spin loading-icon"></i></div>';
    loadingModalHTML += '</div></div>';
    loadingModalHTML += '</ons-modal>';
    $('ons-splitter').after(loadingModalHTML);
    loadingModal = document.querySelector('#loading-modal-template');

    // actionn : show or hide
    function show() {
        loadingModal.show();
    }

    function hide() {
        loadingModal.hide();
    }

    return {
        show: show,
        hide: hide
    }
}());