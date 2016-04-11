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

angular.module('sfdcContacts')
	.controller('LoginCtrl', ['$scope', '$rootScope', '$timeout',
		'$ionicSideMenuDelegate', 'Utils',
		function($scope, $rootScope, $timeout, $ionicSideMenuDelegate, Utils) {

			// disable dragging of sidemenu
			$ionicSideMenuDelegate.canDragContent(false);

			// temporary hard-coded login values
			$scope.loginData = {
				username: '',
				password: '',
				securityToken: ''
			};


			// attempt to log authenticate the user
			$scope.doLogin = function() {
				this.authorize(
					this.loginData,
					function() {
						Utils.log('do contacts');
						$rootScope.loggedIn = true;
						$scope.showSyncModal();
					},
					function() {
						Utils.log('error logging in');
					}
				);
			};


			// start the oauth flow with sfdc
			$scope.authorize = function(loginFormData, success, fail) {
				var params = 'grant_type=password&client_id=' + window.OAuth.clientId +
					'&client_secret=' + window.OAuth.clientSecret + '&username=' +
					loginFormData.username +
					'&password=' + loginFormData.password + loginFormData.securityToken;

				var req = new XMLHttpRequest();
				req.open('POST', window.OAuth.url.authorize, true);

				req.onreadystatechange = function() {
					if (req.readyState == 4) {
						if (req.status == 200) {
							Utils.log('[ authorization - success! ]');
							window.oauthResponse = JSON.parse(req.responseText);
							success();
						} else {
							fail();
						}
					}
				};

				req.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // sfdc expects a form
				req.send(params);
			};

		}
	]);
