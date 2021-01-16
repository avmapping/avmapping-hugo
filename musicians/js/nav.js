const onclickOutside = (flyoutElement, fn, canTrigger = () => {}) => {
	document.addEventListener('click', event => {
		if (!canTrigger(event)) {
			return;
		}

		let targetElement = event.target; // clicked element

		do {
			if (targetElement == flyoutElement) {
				return;
			}
			// Go up the DOM
			targetElement = targetElement.parentNode;
		} while (targetElement);

		// This is a click outside.
		fn();
	});
};

const onLeave = (flyoutElement, fn, canTrigger = () => {}) => {
	document.addEventListener('mousemove', event => {
		if (!canTrigger(event)) {
			return;
		}

		let targetElement = event.target; // clicked element

		do {
			if (targetElement == flyoutElement) {
				return;
			}
			// Go up the DOM
			targetElement = targetElement.parentNode;
		} while (targetElement);

		fn();
	});
};

const openAccordion = naviItemEl => {
	naviItemEl.classList.add('active');
	const accordionEl = naviItemEl.getElementsByClassName('accordion')[0];
	const menuItemWrapperEl = accordionEl.getElementsByClassName('wrapper')[0];
	accordionEl.style.height = `${menuItemWrapperEl.childElementCount * 57}px`;
};

const closeAccordion = naviItemEl => {
	naviItemEl.classList.remove('active');
	const accordionEl = naviItemEl.getElementsByClassName('accordion')[0];
	accordionEl.style.height = '0';
};

const closeAllAccordion = () => {
	const naviItems = document.getElementsByClassName('navi-with-accordion');
	Array.from(naviItems).forEach(el => closeAccordion(el));
};

const toggleAccordion = naviItemId => {
	const itemEl = document.getElementById(naviItemId);
	const accordionEl = itemEl.getElementsByClassName('accordion')[0];

	const isOpen = accordionEl.style.height !== '0px';
	if (isOpen) {
		closeAccordion(itemEl);
	} else {
		openAccordion(itemEl);
	}
};

const openDesktopDropdown = naviItemEl => {
	const naviBtnEl = naviItemEl.getElementsByClassName('navi-item')[0];
	const dropdownEl = naviItemEl.getElementsByClassName('dropdown-menu')[0];

	if (naviBtnEl) {
		naviBtnEl.classList.add('dropdown-open');
	}
	dropdownEl.style.height = `${dropdownEl.childElementCount * 44 + 6}px`;
};

const closeDesktopDropdown = naviItemEl => {
	const naviBtnEl = naviItemEl.getElementsByClassName('navi-item')[0];
	const dropdownEl = naviItemEl.getElementsByClassName('dropdown-menu')[0];

	if (naviBtnEl) {
		naviBtnEl.classList.remove('dropdown-open');
	}
	dropdownEl.style.height = '0';
};

const onLeaveNaviItem = naviItemEl => {
	const dropdownEl = naviItemEl.getElementsByClassName('dropdown-menu')[0];

	onLeave(
		naviItemEl,
		() => closeDesktopDropdown(naviItemEl),
		() => dropdownEl.style.height !== '0px',
	);
};

const openPhoneNaviMenu = () => {
	const menuEl = document.getElementById('phone-navi-menu');
	menuEl.classList.add('active');
	document.body.classList.add('disable-scroll');

	const menuIcon = document.getElementById('phone-menu-icon');
	menuIcon.classList.add('hide');

	const closeIcon = document.getElementById('phone-close-icon');
	closeIcon.classList.remove('hide');
};

const closePhoneNaviMenu = () => {
	const menuEl = document.getElementById('phone-navi-menu');
	menuEl.classList.remove('active');
	document.body.classList.remove('disable-scroll');
	closeAllAccordion();

	const menuIcon = document.getElementById('phone-menu-icon');
	menuIcon.classList.remove('hide');

	const closeIcon = document.getElementById('phone-close-icon');
	closeIcon.classList.add('hide');
};

const togglePhoneNaviMenu = () => {
	const menuEl = document.getElementById('phone-navi-menu');

	const active = menuEl.classList.contains('active');
	if (active) {
		closePhoneNaviMenu();
	} else {
		openPhoneNaviMenu();
	}
};

$(document).ready(function() {
	const userEl = document.getElementById('user');
	onLeaveNaviItem(userEl);

	const naviOfficalWebsiteEl = document.getElementById('navi-item-offical-website');
	onLeaveNaviItem(naviOfficalWebsiteEl);

	const navimusicianEl = document.getElementById('navi-item-musician');
	onLeaveNaviItem(navimusicianEl);

	const naviServiceEl = document.getElementById('navi-item-service');
	onLeaveNaviItem(naviServiceEl);
});
