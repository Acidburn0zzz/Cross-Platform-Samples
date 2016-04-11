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

.controller('AppCtrl',
	function($scope, $rootScope, $ionicModal, $timeout, $state, Sync,
		$ionicHistory, Utils) {

		// this is where the contacts will be stored
		$rootScope.contacts = [];
		$rootScope.accounts = [];

		$scope.showMenuButton = false;
		$rootScope.User = {};

		// setup oauth jazz - throwaway deve// setup oauth jazz - throwaway developer account info

		// don't store your secret keys in here, just for demo.
		window.OAuth = {
			clientId: '',
			clientSecret: '',
			url: {
				authorize: 'https://login.salesforce.com/services/oauth2/token'
			}
		};


		// modals - shared - listen for 'shown' event
		$scope.$on('modal.shown', function(event, modal) {
			if (modal.id !== 'loginModal') {
				Sync.syncContacts().then(
					function() {
						$timeout(function() {
							$state.go('app.contacts');
						}, 250);
						$timeout(function() {
							$scope.syncModal.hide();
						}, 3000); // set this high for demo purposes
					},
					function() {
						Utils.log('sync fail');
					}
				);
			}
		});


		// shared - view account profile
		$scope.viewAccount = function(id, event) {
			$state.go('app.accountProfile', {
				id: id
			});
		};


		// shared - view contact profile
		$scope.viewContact = function(id, event) {
			$state.go('app.contactProfile', {
				id: id
			});
		};


		// modal - login
		$ionicModal.fromTemplateUrl('views/login/login.html', {
			id: 'loginModal',
			scope: $scope
		}).then(function(modal) {
			$scope.loginModal = modal;
		});


		// Triggered in the login modal to close it
		$scope.closeLoginModal = function() {
			$scope.loginModal.hide();
		};


		// Open the login modal
		$scope.showLoginModal = function() {
			$scope.loginModal.show();
		};


		$scope.logout = function() {
			Utils.log('log out');
			$rootScope.loggedIn = false;
			$state.go('app.login');

			$ionicHistory.clearCache().then(function() {
				//now you can clear history or goto another state if you need
				$ionicHistory.clearHistory();
				$ionicHistory.nextViewOptions({
					disableBack: true,
					historyRoot: true
				});
				$state.go('app.login');
			});
		};


		// modal - sync
		$ionicModal.fromTemplateUrl('views/sync/sync.html', {
			id: 'syncModal',
			scope: $scope
		}).then(function(modal) {
			$scope.syncModal = modal;
		});

		// Triggered in the login modal to close it
		$scope.closeSyncModal = function() {
			$scope.syncModal.hide();
		};

		// Open the login modal
		$scope.showSyncModal = function() {
			$scope.syncModal.show();
		}; // /modalSync


		// modal - licenses
		$ionicModal.fromTemplateUrl('views/about/licenses.html', {
			id: 'licensesModal',
			scope: $scope
		}).then(function(modal) {
			$scope.licensesModal = modal;
		});

		$scope.closeLicensesModal = function() {
			$scope.licensesModal.hide();
		};

		$scope.showLicensesModal = function() {
			$scope.licensesModal.show();
		};

	});
