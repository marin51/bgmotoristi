// jshint esversion:6
const Chat = (function() {

    function init(id) {

        template.load('chatGroup');
        const groupData = ChatGroupsList.getGroupById(id);

        $($('#chat-group-ons-page')[0])[0].content.querySelector('.chat-group-page ons-toolbar .center').innerText = groupData.name;
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
