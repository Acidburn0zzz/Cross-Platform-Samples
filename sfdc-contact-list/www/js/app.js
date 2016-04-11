/* Copyright 2015 BlackBerry Ltd.

 Licensed under the Apache License, Version 2.0 (the 'License');
 you may not use this file except in compliance with the License.

 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an 'AS IS' BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 express or implied. See the License for the specific language
 governing permissions and limitations under the License.  */

angular.module('sfdcContacts', ['ionic', 'utils', 'ng-mfb', 'avatarSpinner'])

// on run
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }

    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    // debug mode
    window.debugMode = true;
  });
})

// configuration
.config(function($stateProvider, $urlRouterProvider, $compileProvider,
  $ionicConfigProvider) {

  // URI whitelist setup
  $compileProvider.aHrefSanitizationWhitelist(
    /^\s*(https?|mailto|sms|tel|local|file|geo):/);
  $compileProvider.imgSrcSanitizationWhitelist(
    /^\s*(https?|file|local|blob):|data:image\//);

  // ionic overrides
  $ionicConfigProvider.navBar.alignTitle('center'); // align title center

  $stateProvider
  // main app
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'views/menu/menu.html',
    controller: 'AppCtrl'
  })

  // login
  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'views/login/login.html',
        controller: 'LoginCtrl'
      }
    }
  })

  // contacts
  .state('app.contacts', {
    url: '/contacts',
    views: {
      'menuContent': {
        templateUrl: 'views/contacts/contacts.html',
        controller: 'ContactsCtrl'
      }
    }
  })

  // contact - profile
  .state('app.contactProfile', {
    url: '/contactProfile/:id',
    views: {
      'menuContent': {
        templateUrl: 'views/contactProfile/contactProfile.html',
        controller: 'ContactProfileCtrl'
      }
    }
  })

  // accounts
  .state('app.accounts', {
    url: '/accounts',
    views: {
      'menuContent': {
        templateUrl: 'views/accounts/accounts.html',
        controller: 'AccountsCtrl'
      }
    }
  })

  // account - profile
  .state('app.accountProfile', {
    url: '/accountProfile/:id',
    views: {
      'menuContent': {
        templateUrl: 'views/accountProfile/accountProfile.html',
        controller: 'AccountProfileCtrl'
      }
    }
  })

  // about
  .state('app.about', {
    url: '/about',
    views: {
      'menuContent': {
        templateUrl: 'views/about/about.html',
        controller: 'AboutCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
