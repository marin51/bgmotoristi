// jshint esversion:6
const Chat = (function() {

    function init(id) {

        template.load('chatGroup');
        Navigation.push('chat-group-ons-page', 'fade-ios', controller);

        function controller() {
            Loading.hide();
            console.log('chatGroup');
        }

    }

    return {
        init: init
    }
}());
