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
	.controller('ContactProfileCtrl', ['$scope', '$rootScope', '$stateParams',
		'$state',
		function($scope, $rootScope, $stateParams, $state) {
			$scope.hasPhone = true;
			$scope.hasMobilePhone = true;
			$scope.hasEmail = true;

			// current contact
			$scope.currentContact = _.findWhere($rootScope.contacts, {
				idContact: $stateParams.id
			});

			// current account
			$scope.currentAccount = _.findWhere($rootScope.accounts, {
				idAccount: $scope.currentContact.idAccount
			});

			// if phone/cell/email missing, don't show that field
			if ($scope.currentContact.MobilePhone === null) {
				$scope.hasMobilePhone = false;
			}
			if ($scope.currentContact.Phone === null) {
				$scope.hasPhone = false;
			}
			if ($scope.currentContact.Email === null) {
				$scope.hasEmail = false;
			}


			// sms
			$scope.smsContact = function(phone) {
				window.location.href = 'sms:' + phone;
			};


			// phone
			$scope.phoneContact = function(phone) {
				window.location.href = 'tel:' + phone;
			};


			// email
			$scope.emailContact = function(email) {
				window.location.href = 'mailto:' + email;
			};


			// view account profile
			$scope.viewAccount = function(id, event) {
				$state.go('app.accountProfile', {
					id: id
				});
			};


			// view contact profile
			$scope.viewContact = function(id, event) {
				$state.go('app.contactProfile', {
					id: id
				});
			};

		}
	]);
