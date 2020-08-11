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
                        <ons-toolbar-button onclick="Navigation.openMenu()">
                            <ons-icon icon="md-menu"></ons-icon>
                        </ons-toolbar-button>
                    </div>
                    <div class="center">
                      Home
                    </div>
                </ons-toolbar>
                <div class="main-container">
                  <img src="img/home-logo1.svg" alt="home cover"/>
                  <div class="welcome-message">
                    <h3>Welcome to Bulgarian Rockers App.</h3>
                    <p>Here you can find each other on the map, share posts and chat in groups.</p>
                    <p>Let's start.</p>
                  </div>
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
                            <ons-toolbar-button onclick="Navigation.openMenu()">
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
                        <div class="inner-container">
                            <div class="welcome-message">
                                <p><i class="fas fa-user-secret"></i></p>
                                <h4>Please login or register before you go</h4>
                            </div>
                            <div class="sign-up-form-container hide">
                                <form id="sign-up-form">
                                    <div class="inputs-container">
                                        <input type="email" id="sign-up-email" class="text-input text-input--material" placeholder="Email Adress" required>
                                    </div>
                                    <div class="inputs-container">
                                        <input type="password" id="sign-up-password" class="text-input text-input--material" placeholder="Password" required>
                                    </div>
                                    <div class="inputs-container">
                                        <input type="name" id="sign-up-first-name" class="text-input text-input--material" placeholder="First Name" required>
                                    </div>
                                    <div class="inputs-container">
                                        <input type="name" id="sign-up-last-name" class="text-input text-input--material" placeholder="Last Name" required>
                                    </div>
                                    <button class="button">Sign up</button>
                                    <span id="back-to-login" class="button--quiet">Login</span>
                                </form>
                            </div>
                            <div class="login-form-container">
                                <form id="login-form">
                                    <div class="inputs-container">
                                        <input type="email" id="login-email" class="text-input text-input--material" placeholder="Email Adress" required>
                                    </div>
                                    <div class="inputs-container">
                                        <input type="password" id="login-password" class="text-input text-input--material" placeholder="Password" required>
                                    </div>
                                    <button class="button">Login</button>
                                    <span id="go-to-register" class="button--quiet">Register</span>
                                </form>
                            </div>
                        </div>
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
                        <ons-toolbar-button onclick="Navigation.openMenu()">
                            <ons-icon icon="md-menu"></ons-icon>
                        </ons-toolbar-button>
                    </div>
                    <div class="center">
                        My Bookmarks
                    </div>
                </ons-toolbar>

                    <div class="main-container">
                      <ons-list class="users-ons-list">
                          <ons-lazy-repeat id="users-infinite-list"></ons-lazy-repeat>
                      </ons-list>
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
                            <ons-toolbar-button onclick="Navigation.pop()">
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
                            <ons-toolbar-button onclick="Navigation.openMenu()">
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
                            <ons-toolbar-button onclick="Navigation.openMenu()">
                                <ons-icon icon="md-menu"></ons-icon>
                            </ons-toolbar-button>
                        </div>
                        <div class="center">
                            All users
                        </div>
                    </ons-toolbar>
                    <div class="main-container">
                        <ons-list class="users-ons-list">
                            <ons-lazy-repeat id="users-infinite-list"></ons-lazy-repeat>
                        </ons-list>
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
                            <ons-toolbar-button onclick="Navigation.openMenu()">
                                <ons-icon icon="md-menu"></ons-icon>
                            </ons-toolbar-button>
                        </div>
                        <div class="center">
                            Map
                        </div>
                        <div class="right">
                            <i class="fal fa-map-marker-edit"></i>
                        </div>
                    </ons-toolbar>
                    <div class="main-container">
                      <div id="map"></div>
                    </div>
                </ons-page>
            </template>`
        },
        userDetails: {
            id: `user-details-ons-page`,
            html: `
            <template id="user-details-ons-page">
                <ons-page class="user-details-page">
                    <ons-toolbar>
                        <div class="left">
                          <ons-toolbar-button onclick="Navigation.pop()">
                              <i class="fas fa-chevron-left"></i>
                          </ons-toolbar-button>
                        </div>
                        <div class="center">
                            Details
                        </div>
                    </ons-toolbar>
                    <div class="main-container">
                        <p>User details works</p>
                    </div>
                </ons-page>
            </template>`
        }
    }


    return {
        load: load
    }

}());