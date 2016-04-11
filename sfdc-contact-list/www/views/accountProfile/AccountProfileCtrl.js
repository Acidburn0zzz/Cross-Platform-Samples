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
	.controller('AccountProfileCtrl', ['$scope', '$rootScope', '$stateParams',
		'$ionicHistory', '$state',
		function($scope, $rootScope, $stateParams, $ionicHistory, $state) {

			// get current account
			$scope.currentAccount = _.findWhere($rootScope.accounts, {
				idAccount: $stateParams.id
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

		}
	]);
