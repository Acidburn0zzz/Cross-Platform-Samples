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
	.controller('ContactsCtrl', ['$scope', '$rootScope', '$timeout', '$state',
		'$ionicLoading', '$ionicSideMenuDelegate', 'avatarSpinner', 'Utils',
		function($scope, $rootScope, $timeout, $state, $ionicLoading,
			$ionicSideMenuDelegate, avatarSpinner, Utils) {

			// re-enable sidemenu swiping
			$ionicSideMenuDelegate.canDragContent(true);

			// enter view
			$scope.$on('$ionicView.enter', function(e) {
				Utils.log('[ enter view > contacts ]');
				$scope.clearAll();
				$scope.contactSearchString = undefined;
			});


			// login logic
			if ($rootScope.loggedIn) {
				if ($rootScope.contacts.length < 1) {
					Utils.log('[ no contacts stored, sync modal ]');
					$scope.showSyncModal();
					setTimeout(function() {
						$scope.showSyncModal();
					}, 300);
				}
			} else {
				if (!$rootScope.loggedIn) {
					Utils.log('loggedIn: false');
					$state.go('app.login');
				}
			}


			// dialog TODO: make util
			$scope.dialog = function(label) {
				Utils.log('dialog::: ' + label);
				$ionicLoading.show({
					noBackdrop: true,
					template: label
				});
				$timeout(function() {
					$ionicLoading.hide();
				}, 2000);
			};


			// clear all
			$scope.clearAll = function() {
				avatarSpinner.clearAllSelections();
			};


			// bulk sms
			$scope.bulkSMS = function() {
				if ($rootScope.selectedItems.length <= 0) {
					$scope.dialog('Tap an avatar to select a user');
					$scope.fabState = 'closed'; // causes the cancel selection to fire
				} else {
					Utils.log('> bulk sms');
					var cells = '';
					for (var x = 0; x < $rootScope.selectedItems.length; x++) {
						if ($rootScope.selectedItems[x].cellPhone !== '') {
							cells += $rootScope.selectedItems[x].MobilePhone;
							cells += ',';
						}
					}
					window.location.href = 'sms:' + cells;
					Utils.log($rootScope.selectedItems);

					Utils.log('sms to: ' + cells);
					$timeout(function() {
						$scope.fabState = 'closed'; // causes the cancel selection to fire
						$scope.clearAll();
					}, 800);
				}
			};


			// bulk email
			$scope.bulkEmail = function() {
				if ($rootScope.selectedItems.length <= 0) {
					$scope.dialog('Tap an avatar to select a user');
					$scope.fabState = 'closed'; // causes the cancel selection to fire
				} else {
					Utils.log('> bulk email');
					var emails = '';
					for (var y = 0; y < $rootScope.selectedItems.length; y++) {
						if ($rootScope.selectedItems[y].Email !== '') {
							emails += $rootScope.selectedItems[y].Email;
							emails += ',';
						}
					}
					window.location.href = 'mailto:' + emails;
					Utils.log('email to: ' + emails);
				}
				$scope.fabState = 'closed'; // causes the cancel selection to fire
				$scope.clearAll();
			};


		}
	]);
