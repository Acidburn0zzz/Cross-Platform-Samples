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

angular.module('utils', [])

.factory('Utils', ['$rootScope', '$http', '$ionicLoading', '$q',
	function($rootScope, $http, $ionicLoading, $q) {
		return {

			// parse the json received
			parseJSON: function(data) {
				var deferred = $q.defer();
				data = JSON.parse(data);

				var tempAccounts = [];
				var tempContacts = [];
				var accountsLength = data.records.length || 0;
				var idContact = 0;
				var idAccount = 0;

				// for each account
				for (var x = 0; x < accountsLength; x++) {
					var account = data.records[x];
					var accountContacts;

					try {
						if (typeof account.Contacts === 'undefined' || account.Contacts ===
							null) {
							accountContacts = [];
						} else {
							accountContacts = account.Contacts.records;
						}
					} catch (e) {
						accountContacts = [];
					}

					var contactsLength = accountContacts.length;
					idAccount++;

					// temp photo - not used now but could be
					account.PhotoUrl = '';

					// if no contacts, don't show anything for this account
					if (contactsLength > 0) {

						// get contacts for account
						for (var y = 0; y < contactsLength; y++) {
							var contact = accountContacts[y];
							idContact++;
							contact['AccountName'] = account.Name;
							contact['idContact'] = '' + idContact;
							contact['idAccount'] = '' + idAccount;

							// temp photo
							contact.PhotoUrl = 'img/bill.jpg';
							tempContacts.push(contact);
						}
						account['idAccount'] = '' + idAccount;
						tempAccounts.push(account);
					}
				}

				$rootScope.contacts = tempContacts;
				$rootScope.accounts = tempAccounts;
				tempContacts = [];
				tempAccounts = [];

				// save data locally here if you like

				deferred.resolve();
				return deferred.promise;
			},


			// logger utility
			log: function(msg) {
				if (window.debugMode) {
					console.log('>> ' + msg);
				}
			}

		};
	}
]);
