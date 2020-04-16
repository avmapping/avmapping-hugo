let userType = 'audio'; // user type can be 'audio', 'video' or ''
const baseURL = 'https://beta.avmapping.co'
var API = {'signup': baseURL+'/api/signup',
		   'signin': baseURL+'/api/signin'}

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

function userSignUp() {
	console.log('commitSignup');
	var form = $('#form_signup');
	var url = API['signup'];
	var fields = $("#form_signup .required").find("input").serializeArray();
	var isRequired = false;
	$.each(fields, function(i, field) {
		if (!field.value) {
			alert(field.name + ' is required');
			isRequired = true;
		} 
	});

	if (!isRequired) {
		$.ajax({
	        type : "POST",
	        url  : url,
	        data : form.serialize(),
	        success : function(response) {
	        	console.log(response);
	        	if (response != 'err') {
	        		login_state = true;
	        		closeSign();
	        		login_auth();
	        	} else {
	        		alert('Oops! Something went wrong.');
	        		form[0].reset();
	        		$("#check-signup-email").html("");
	        		$("#check-password").html("");
	        	}
			},
			error: function(error){
	            console.log(error);
	        }
	    });
	}
	//console.log(fields);
};

function userSignIn() {
	console.log('commitSignin');

	var form = $('#form_signin');
	var url = API['signin'];
	console.log('url> ',url);
	$.ajax({
        type : "POST",
        url  : url,
        data : form.serialize(),
        success : function(response) {
        	console.log(response);
        	if (response != 'err') {
        		login_state = true;
        		closeSign();
        		login_auth();
        	} else {
        		alert('Sorry! The email address or password is incorrect.');
        		$("#form_signin")[0].reset();
        	}
		},
		error: function(error){
            console.log(error);
        }
    });
};

function checkEmail() {
	var email = document.getElementById('signup-email');
	var check_signup_email = document.getElementById('check-signup-email');
	if (!email.value.includes('@')) {
		check_signup_email.style.color = '#ef7873';
		check_signup_email.innerHTML = "please enter correct email address."
	} else {
		check_signup_email.innerHTML = ""	
	}
}

function checkPassword() {
	var pass = document.getElementById('password');
	var re_pass = document.getElementById('re-password');
	var check_pass = document.getElementById('check-password');
  	if (pass.value == re_pass.value) {
    	check_pass.style.color = '#30c1b8';
    	check_pass.innerHTML = 'matching!';
  	} else {
    	check_pass.style.color = '#ef7873';
    	check_pass.innerHTML = 'not matching!';
  	}
};

function login_auth() {
	if (login_auth) {
		if ((type = 'phone')) {
			setTimeout(() => {
				switchNavDisplay('login');
			}, 500);
		} else {
			switchNavDisplay('login');
		}
	} else {
		if ((type = 'phone')) {
			setTimeout(() => {
				switchNavDisplay('notLogin');
			}, 500);
		} else {
			switchNavDisplay('notLogin');
		}
	}
};

var mouse_is_inside = true;
var login_state = false;

$(document).ready(function()
{	
	/*
	console.log(url);
	console.log('{{ api/login/auth }}');
	$.ajax({
        type :"POST",
        url  :"http://localhost:8888/api/login_auth",
        success : function(response) {
        	console.log('success');
        	console.log(response);
        	if (response != 'err') {
        		login_state = true;
        		closeSign();
        		login_auth();
        	} else {
        		closeSign();
        		alert('Oops! Something went wrong.');
        	}
		},
		error: function(error){
            console.log(error);
        }
    });
    */

    $('.sign-in-form').hover(function(){ 
        mouse_is_inside=true; 
    }, function(){ 
        mouse_is_inside=false; 
    });
    
    $('.sign-up-form').hover(function(){ 
        mouse_is_inside=true; 
    }, function(){ 
        mouse_is_inside=false; 
    });

    $("body").mouseup(function(){ 
        if(! mouse_is_inside) $('#section-sign-in').hide();
        if(! mouse_is_inside) $('#section-sign-up').hide();
    });
});
