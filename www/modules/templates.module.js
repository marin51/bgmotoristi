// jshint esversion:6
const template = (function() {
    'use strict';

    function load(templateName) {
        let templateId = allTemplates[templateName].id;

        if (!$("#" + templateId).length) {
            $('ons-splitter').after(allTemplates[templateName].html);
        } else {
            let selector = $($('#' + templateId)[0])[0].content;
            // selector.querySelector('.main-container').innerHTML = ``;
        }

    }

    const allTemplates = {
        home: {
            id: `home-ons-page`,
            html: `
            <template id="home-ons-page">
              <ons-page class="home-page">
                <ons-toolbar>
                    <div class="left">
                        <ons-toolbar-button onclick="navigation.openMenu()">
                            <ons-icon icon="md-menu"></ons-icon>
                        </ons-toolbar-button>
                    </div>
                    <div class="center">
                      Home
                    </div>
                </ons-toolbar>
                <div class="main-container">
                  <p>home works</p>
                </div>
              </ons-page>
            </template>`
        },
        chatGroups: {
            id: `chat-groups-ons-page`,
            html: `
            <template id="chat-groups-ons-page">
                <ons-page class="chat-groups-page">
                    <ons-toolbar>
                        <div class="left">
                            <ons-toolbar-button onclick="navigation.openMenu()">
                                <ons-icon icon="md-menu"></ons-icon>
                            </ons-toolbar-button>
                        </div>
                        <div class="center">
                            Chat Groups
                        </div>
                    </ons-toolbar>
                    <div class="main-container">
                        <p>chat groups works</p>
                    </div>
                </ons-page>
            </template>`
        },
        login: {
            id: `login-ons-page`,
            html: `
            <template id="login-ons-page">
                <ons-page class="login-page">
                    <ons-toolbar>
                        <div class="center">
                            Login Page
                        </div>
                    </ons-toolbar>
                    <div class="main-container">
                        <p>login works</p>
                    </div>
                </ons-page>
            </template>`
        },
        myBookmarks: {
            id: `my-bookmarks-ons-page`,
            html: `
            <template id="my-bookmarks-ons-page">
                <ons-page class="my-bookmarks-page">
                <ons-toolbar>
                    <div class="left">
                        <ons-toolbar-button onclick="navigation.openMenu()">
                            <ons-icon icon="md-menu"></ons-icon>
                        </ons-toolbar-button>
                    </div>
                    <div class="center">
                        My Bookmarks
                    </div>
                </ons-toolbar>

                    <div class="main-container">
                        <p>my bookmarks works</p>
                    </div>
                </ons-page>
            </template>`
        },
        settings: {
            id: `settings-ons-page`,
            html: `
            <template id="settings-ons-page">
                <ons-page class="settings-page">
                    <ons-toolbar>
                        <div class="left">
                            <ons-toolbar-button onclick="navigation.pop()">
                                <i class="fas fa-chevron-left"></i>
                            </ons-toolbar-button>
                        </div>
                        <div class="center">
                            Settings
                        </div>
                    </ons-toolbar>

                    <div class="main-container">
                        <p>Settings</p>
                    </div>
                </ons-page>
            </template>`
        },
        socialWall: {
            id: `social-wall-ons-page`,
            html: `
            <template id="social-wall-ons-page">
                <ons-page class="social-wall-page">
                    <ons-toolbar>
                        <div class="left">
                            <ons-toolbar-button onclick="navigation.openMenu()">
                                <ons-icon icon="md-menu"></ons-icon>
                            </ons-toolbar-button>
                        </div>
                        <div class="center">
                            Social Wall
                        </div>
                    </ons-toolbar>
                    <div class="main-container">
                        <p>social wall works</p>
                    </div>
                </ons-page>
            </template>`
        },
        usersList: {
            id: `users-list-ons-page`,
            html: `
            <template id="users-list-ons-page">
                <ons-page class="users-list-page">
                    <ons-toolbar>
                        <div class="left">
                            <ons-toolbar-button onclick="navigation.openMenu()">
                                <ons-icon icon="md-menu"></ons-icon>
                            </ons-toolbar-button>
                        </div>
                        <div class="center">
                            All users
                        </div>
                    </ons-toolbar>
                    <div class="main-container">
                        <p>Users List works</p>
                    </div>
                </ons-page>
            </template>`
        },
        usersMap: {
            id: `users-map-ons-page`,
            html: `
            <template id="users-map-ons-page">
                <ons-page class="users-map-page">
                    <ons-toolbar>
                        <div class="left">
                            <ons-toolbar-button onclick="navigation.openMenu()">
                                <ons-icon icon="md-menu"></ons-icon>
                            </ons-toolbar-button>
                        </div>
                        <div class="center">
                            Map
                        </div>
                    </ons-toolbar>
                    <div class="main-container">
                        <p>Users map works</p>
                    </div>
                </ons-page>
            </template>`
        },
    }


    return {
        load: load
    }

}());