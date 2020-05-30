let userType = 'audio'; // user type can be 'audio', 'video' or ''

const switchNavDisplay = nextState => {
	const loginNavEls = Array.from(document.getElementsByClassName('user-login'));
	const notLoginNavEls = Array.from(document.getElementsByClassName('user-not-login'));

	if (nextState === 'login') {
		loginNavEls.forEach(el => el.classList.remove('hide'));
		notLoginNavEls.forEach(el => el.classList.add('hide'));
	} else if (nextState === 'notLogin') {
		loginNavEls.forEach(el => el.classList.add('hide'));
		notLoginNavEls.forEach(el => el.classList.remove('hide'));
	}
};

const login = (type = 'desktop') => {
	console.log('login');

	// on login
	closePhoneNaviMenu();
	if ((type = 'phone')) {
		setTimeout(() => {
			switchNavDisplay('login');
		}, 500);
	} else {
		switchNavDisplay('login');
	}
};

const logout = (type = 'desktop') => {
	console.log('logout');

	// on logout
	closePhoneNaviMenu();
	if ((type = 'phone')) {
		setTimeout(() => {
			switchNavDisplay('notLogin');
		}, 500);
	} else {
		switchNavDisplay('notLogin');
	}
};

const signup = (type = 'desktop') => {
	console.log('signup');

	closePhoneNaviMenu();
};

const switchUser = (type = 'desktop') => {
	console.log('switchUser');

	// on switch success
	const newUserType = 'video';

	const avatarEl = document.getElementById('user-avatar');
	avatarEl.classList.remove(userType);
	avatarEl.classList.add(newUserType);
	userType = newUserType;

	closePhoneNaviMenu();
};
