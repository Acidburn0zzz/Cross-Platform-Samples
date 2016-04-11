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
	.factory('Sync', ['$rootScope', 'Utils', '$q',
		function($rootScope, Utils, $q) {
			return {

				// sync contacts
				syncContacts: function(success, fail) {
					Utils.log('[ sync contacts ]');
					var deferred = $q.defer();

					// get contacts
					this.getSalesforceData(
						function() {
							deferred.resolve();
						},
						function() {
							deferred.reject();
						}
					);
					return deferred.promise;
				},

				// get contacts from sfdc api
				getSalesforceData: function(success, fail) {
					Utils.log('network > get contacts');
					window.instanceURL = window.oauthResponse.instance_url;

					var query =
						"SELECT Name, Website, Description, BillingAddress, (SELECT AccountId, FirstName, LastName, Id, Phone, Title, Department, Description, MobilePhone, Email, MailingCity, MailingState, MailingCountry, MailingPostalCode, MailingStreet FROM Contacts) FROM Account";

					var url = instanceURL + '/services/data/v30.0/query?q=' + query;
					var req = new XMLHttpRequest();

					req.open('GET', url, true);
					req.onreadystatechange = function() {
						if (req.readyState == 4) {
							if (req.status == 200) {
								var response = req.responseText;

								Utils.parseJSON(response)
									.then(
										// success
										function() {
											success();
										},
										// fail
										function() {
											fail();
										}
									);

							} else {
								Utils.log('failed');
								fail();
							}
						}
					};
					req.setRequestHeader('Authorization', 'OAuth ' + window.oauthResponse.access_token);
					req.send();
				}
			};
		}

	]);
