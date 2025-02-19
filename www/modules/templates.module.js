// jshint esversion:6
const template = (function() {
    'use strict';
    function load(templateName) {
        let templateId = allTemplates[templateName].id;
        if (!$("#" + templateId).length) {
            $('ons-splitter').after(allTemplates[templateName].html);
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
                        <div onclick="AddChat.init()" class="right">
                            <i class="fal fa-comment-plus"></i>
                        </div>
                    </ons-toolbar>
                    <ons-pull-hook id="pull-hook"></ons-pull-hook>
                    <div class="main-container">
                        <ons-list class="groups-list"><ons-lazy-repeat id="groups-infinite-list"></ons-lazy-repeat></ons-list>
                    </div>
                </ons-page>
            </template>`
        },
        chatGroup: {
            id: `chat-group-ons-page`,
            html: `
            <template id="chat-group-ons-page">
                <ons-page class="chat-group-page">
                  <ons-toolbar>
                      <div class="left">
                          <ons-toolbar-button onclick="Navigation.pop()">
                              <i class="fas fa-chevron-left"></i>
                          </ons-toolbar-button>
                      </div>
                      <div class="center">

                      </div>
                  </ons-toolbar>
                  <div class="main-container">
                      <div id="group-chat-messages-list"></div>
                  </div>
                  <ons-bottom-toolbar class="chat-form-container">
                      <div class="text-area-container"><textarea id="group-chat-input" placeholder="" wrap="soft" rows="1"></textarea></div>
                      <div class="send-button-container"><i class="fal fa-paper-plane"></i></div>
                  </ons-bottom-toolbar>
                </ons-page>
            </template>`
        },
        addChat: {
            id: `add-chat-ons-page`,
            html: `
            <template id="add-chat-ons-page">
                <ons-page class="add-chat-page">
                    <ons-toolbar>
                      <div class="left">
                        <ons-toolbar-button onclick="Navigation.pop()">
                            <i class="fas fa-chevron-left"></i>
                        </ons-toolbar-button>
                      </div>
                      <div class="center">
                          Add Chat
                      </div>
                      <div class="right">
                      </div>
                    </ons-toolbar>
                    <div class="main-container">
                      <div class="create-group-container">
                          <div class="add-chat-cover-image"><i class="fal fa-users"></i></div>
                          <ons-input placeholder="Name" modifier="underbar" maxlength="25" id="group-name"></ons-input>
                          <ons-input placeholder="Description" modifier="underbar" maxlength="40" id="group-description"></ons-input>
                          <div class="upload-cover-image-button-container">
                              <ons-button modifier="quiet">Upload cover image</ons-button>
                          </div>
                          <div id="add-chat-group-button"><button class="button">Create</button></div>
                      </div>
                    </div>
                </ons-page>
            </template>`
        },
        addPostComment: {
            id: `add-post-comment-ons-page`,
            html: `
            <template id="add-post-comment-ons-page">
                <ons-page class="add-comment-page">
                    <ons-toolbar>
                      <div class="left">
                        <ons-toolbar-button onclick="Navigation.pop()">
                            <i class="fas fa-chevron-left"></i>
                        </ons-toolbar-button>
                      </div>
                      <div class="center">
                          Post Comments
                      </div>
                      <div class="right">
                      </div>
                    </ons-toolbar>
                    <div class="main-container">
                        <div id="social-wall-comments-list"></div>
                    </div>
                    <ons-bottom-toolbar class="add-post-comment-form-container">
                        <div class="text-area-container"><textarea id="add-comment-input" placeholder="" wrap="soft" rows="1"></textarea></div>
                        <div class="send-comment-button-container"><i class="fal fa-paper-plane"></i></div>
                    </ons-bottom-toolbar>
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
                  <ons-tabbar class="social-wall-tabbar" position="auto">
                     <ons-tab page="social-wall-posts-list-ons-page" icon="ion-home" active> </ons-tab>
                     <ons-tab page="social-wall-add-new-post-ons-page" icon="ion-ios-plus-outline"> </ons-tab>
                  </ons-tabbar>
                  <ons-fab id="social-wall-fab" class=" hide" position="bottom right"><i class="far fa-bell"></i></ons-fab>
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
        },
        socialWallPostsList: {
            id: `social-wall-posts-list-ons-page`,
            html: `
            <template id="social-wall-posts-list-ons-page">
                <ons-page class="social-wall-posts-list-page">
                    <div class="main-container">
                        <ons-list class="posts-list">
                            <ons-lazy-repeat id="posts-infinite-list"></ons-lazy-repeat>
                        </ons-list>
                    </div>
                </ons-page>
            </template>`
        },
        socialWallAddNewPost: {
            id: `social-wall-add-new-post-ons-page`,
            html: `
            <template id="social-wall-add-new-post-ons-page">
                <ons-page class="social-wall-add-new-post-page">
                    <div class="main-container">

                        <div class="textarea-container">
                          <textarea class="textarea" placeholder="What is on your mind?"></textarea>
                        </div>
                        <div class="upload-image-button-container">
                          <div><i class="fal fa-camera-alt"></i></div>
                        </div>
                        <div id="add-new-post-button"><button class="button">Publish</button></div>
                    </div>
                </ons-page>
            </template>`
        }
    };
    return {
        load: load
    }
}());
