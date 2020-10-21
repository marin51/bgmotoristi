// jshint esversion:6
const Chat = (function() {
    let messagesListener = null;

    function init(id) {
        let allMessagesArray = [],
            allUsersArray = [];

        template.load('chatGroup');
        const groupData = ChatGroupsList.getGroupById(id);

        $($('#chat-group-ons-page')[0])[0].content.querySelector('.chat-group-page ons-toolbar .center').innerText = groupData.name;
        Navigation.push('chat-group-ons-page', 'fade-ios', controller);

        function controller() {
            Loading.hide();
            // TODO: 1. Attach listener for messages
            messagesListener = MessagesService.getRef().where('groupId', '==', groupData.id).orderBy('timestamp', 'asc').onSnapshot(function(querySnapshot) {
                allMessagesArray = [];
                allUsersArray = Users.get();
                // TODO: 2 show messages
                if (querySnapshot.docs.length) {
                    for (let i = 0; i < querySnapshot.docs.length; i += 1) {
                        let message = querySnapshot.docs[i].data();
                        allMessagesArray.push(message);
                    }
                } else {
                    // TODO: show empty state
                }

                if ($('.chat-group-page .single-message-container').length > 0) {
                    querySnapshot.docChanges().forEach(function(change) {
                        if (change.type === "added") { addNewMessage(change.doc.data()); }
                        if (change.type === "modified") {}
                        if (change.type === "removed") {}

                    });
                } else {
                    loadMessages();
                    Loading.hide();
                }
            });

            function loadMessages() { for (var i = 0; i < allMessagesArray.length; i += 1) { addNewMessage(allMessagesArray[i]); } }

            function addNewMessage(message) {
                let user = allUsersArray.filter((u) => { if (u.id === message.userId) { return u; } })[0];
                let messageHtml = `
                <div class="single-message-container ${(message.userId === localStorage.getItem('logged_user_id')) ? 'sender' : 'reciever'}">
                   <div class="message-text">${message.text}</div>
                   <div class="message-sender">${user.firstName} ${user.lastName}</div>
                   <div class="message-time">At ${new Date(message.timestamp).toLocaleString()}</div>
                </div>`;
                $('.chat-group-page .main-container #group-chat-messages-list').append(messageHtml);
            }

            // TODO: 3. Add new message event
            $('.chat-form-container .send-button-container').on('click', function() {
                const button = $(this);
                const text = $('.chat-form-container #group-chat-input').val();
                button.prop('disabled', true);
                if (text.length) {
                    MessagesService.addMessage(text, groupData.id).then(function() {
                        $('.chat-form-container #group-chat-input').val('');
                        button.prop('disabled', false)
                    }, function(error) {
                        // TODO: show error message
                        console.log('error', error);
                        ons.notification.alert({
                            message: 'Message was not sent, check your internet connection and try again, please.'
                        });
                    });
                }
            });
        }
    }

    return {
        init: init
    }
}());
