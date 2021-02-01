/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
/*jshint esversion: 6 */
let auth,
    db,
    storage;
const app = {
    // Application Constructor
    initialize: function() {
        // document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        this.bindEvents();
    },
    bindEvents: function() {
        if (typeof cordova == "object") {
            document.addEventListener('deviceready', this.onDeviceReady, false);
            document.addEventListener("resume", this.onDeviceResume, false);
        } else {
            this.onDeviceReady("browser");
        }
    },
    onDeviceReady: function() {
        setTimeout(function() {
            Database.init();
            document.querySelector('#loading-modal-global').show();
            ons.ready(function() {
                ons.disableDeviceBackButtonHandler();
                document.addEventListener('backbutton', function() {
                    if ($('#myNavigator').children().length > 1) {
                        Navigation.back();
                    } else {
                        navigator.app.exitApp();
                    }
                }, true);
            });
        }, 0);
    }
};
