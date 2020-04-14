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
	console.log(document.getElementById('section-sign-in').style);
	document.getElementById('section-sign-up').style.display = 'none';
	document.getElementById('section-sign-in').style.display = 'block';
	/*
	if ((type = 'phone')) {
		setTimeout(() => {
			switchNavDisplay('login');
		}, 500);
	} else {
		switchNavDisplay('login');
	}
	*/
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
	document.getElementById('section-sign-in').style.display = 'none';
	document.getElementById('section-sign-up').style.display = 'block';
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

const closeSign = (type = 'phone') => {
	document.getElementById('section-sign-in').style.display = 'none';
	document.getElementById('section-sign-up').style.display = 'none';
};

var mouse_is_inside = true;
$(document).ready(function()
{
    $('.sign-in-form').hover(function(){ 
        mouse_is_inside=true; 
    }, function(){ 
        mouse_is_inside=false; 
    });

    $("body").mouseup(function(){ 
        if(! mouse_is_inside) $('#section-sign-in').hide();
        if(! mouse_is_inside) $('#section-sign-up').hide();
    });
});