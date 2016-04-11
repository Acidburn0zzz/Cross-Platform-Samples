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

angular.module('avatarSpinner', [])
	.factory('avatarSpinner', function($rootScope) {

		$rootScope.clearSelects = false;
		$rootScope.selectMode = false;
		$rootScope.selectedItems = [];
		$rootScope.selectedEls = [];

		return {
			// clear all selections
			clearAllSelections: function() {

				var els = $rootScope.selectedEls;
				for (var el in els) {
					var wrapperEl = els[el][0].childNodes[1];
					wrapperEl = angular.element(wrapperEl)[0].children[0];
					wrapperEl.classList.remove('spin-thumbnail');

					var checkmark = angular.element(wrapperEl)[0].children[1];
					checkmark.classList.remove('checkmark-scale');

					var label = angular.element(wrapperEl)[0].children[0];
					label.style.display = 'block';

					var parentEl = angular.element(els[el][0]);
					parentEl = angular.element(parentEl);
					parentEl.removeClass('selected-item');
				}

				$rootScope.clearSelects = false;
				$rootScope.selectMode = false;
				$rootScope.selectedItems = [];
				$rootScope.selectedEls = [];
			},

			// clear individual item
			clearSelection: function(el, parentEl, lastNameInitialEl, checkmarkEl, id) {
				el.removeClass('spin-thumbnail');
				parentEl.removeClass('selected-item');
				checkmarkEl.classList.remove('checkmark-scale');
				lastNameInitialEl.style.display = 'block';

				$rootScope.selectedItems = _.without($rootScope.selectedItems, _.findWhere(
					$rootScope.selectedItems, {
						idContact: id
					}));
			}
		};

	})

.directive('avatarSpinner', function($rootScope, $timeout, avatarSpinner) {
	return {
		restrict: 'E',
		template: '<div class="thumbnail-spinner-wrapper" contact-id="{{ id }}"><p class="thumbnail-label">{{ label }}</p><i class="checkmark icon ion-ios-checkmark-empty"></i></div>',

		link: function(scope, element, attrs) {
			var contact = JSON.parse(attrs.itemData);
			scope.label = attrs.label;
			scope.id = contact.idContact;

			element.bind('click', function() {
				var wrapperEl = angular.element(element).parent();
				var parentEl = angular.element(element[0].children[0]);
				var lastNameInitialEl = parentEl[0].children[0];
				var checkmarkEl = parentEl[0].children[1];
				var isSelected = angular.element(wrapperEl).hasClass('selected-item');

				// de-select
				if (isSelected) {
					avatarSpinner.clearSelection(parentEl, wrapperEl, lastNameInitialEl,
						checkmarkEl,
						contact.idContact);
				}

				// select
				else {
					$rootScope.selectMode = true;
					$rootScope.clearSelects = true;

					$timeout(function() {
						parentEl.addClass('spin-thumbnail');
						wrapperEl.addClass('selected-item');
						$timeout(function() {
							lastNameInitialEl.style.display = 'none';
							$timeout(function() {
								checkmarkEl.classList.add('checkmark-scale');
							}, 120);
						}, 150);
					}, 1);

					$rootScope.selectedItems.push(contact);
					$rootScope.selectedEls.push(wrapperEl);
				}
				scope.$apply();
			});
		}
	};
});
