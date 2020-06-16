let userType = 'audio'; // user type can be 'audio', 'video' or ''
//const baseURL = 'http://localhost:8888';
const baseURL = 'https://filmmusic.avmapping.co';
var API = {'signup': baseURL+'/api/auth/signup',
		   'signin': baseURL+'/api/auth/signin',
		   'resetpwd': baseURL+'/api/auth/reset'};

const switchNavDisplay = nextState => {
	/*
	const loginNavEls = Array.from(document.getElementsByClassName('user-login'));
	const notLoginNavEls = Array.from(document.getElementsByClassName('user-not-login'));

	if (nextState === 'login') {
		loginNavEls.forEach(el => el.classList.remove('hide'));
		notLoginNavEls.forEach(el => el.classList.add('hide'));
	} else if (nextState === 'notLogin') {
		loginNavEls.forEach(el => el.classList.add('hide'));
		notLoginNavEls.forEach(el => el.classList.remove('hide'));
	}
	*/
	const loginNavElsAttr = ["nav-user-login", "nav-login"];
	const notloginNavElsAttr = ["navi-user-login", "navi-user-signup", "nav-login", "navi-signup"];

	if (nextState === 'login') {
		for (var i=0; i<loginNavElsAttr.length; i++) {
			document.getElementById(loginNavElsAttr[i]).classList.remove('hide');
		}
		for (var i=0; i<notloginNavElsAttr.length; i++) {
			document.getElementById(notloginNavElsAttr[i]).classList.add('hide');
		}
	} else if (nextState === 'notLogin') {
		for (var i=0; i<loginNavElsAttr.length; i++) {
			document.getElementById(loginNavElsAttr[i]).classList.add('hide');
		}
		for (var i=0; i<notloginNavElsAttr.length; i++) {
			document.getElementById(notloginNavElsAttr[i]).classList.remove('hide');
		}
	}
};

const login = (type = 'desktop') => {
	console.log('login');

	// on login
	closePhoneNaviMenu();
	document.getElementById('section-sign-up').style.display = 'none';
	document.getElementById('section-sign-in').style.display = 'block';
	document.getElementById('section-reset-pwd').style.display = 'none';
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
	document.getElementById('section-reset-pwd').style.display = 'none';
};

const resetpwd = (type = 'desktop') => {
	console.log('resetpwd');

	closePhoneNaviMenu();
	document.getElementById('section-sign-in').style.display = 'none';
	document.getElementById('section-sign-up').style.display = 'none';
	document.getElementById('section-reset-pwd').style.display = 'block';
	return false
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
	document.getElementById('section-reset-pwd').style.display = 'none';
	clearSign();
};

function clearSign() {
	for (var i=0; i<2; i++) {
		var check_pass = document.getElementById('check-password-'+i);
		check_pass.innerHTML = '';
	}
}

function userSignUp() {
	console.log('commitSignup');
	var form = $('#form_signup');
	var url = API['signup'];
	console.log('url> ',url);
	var fields = $("#form_signup .required").find("input").serializeArray();
	var isRequired = false;
	$.each(fields, function(i, field) {
		if (!field.value) {
			alert(field.name + ' is required');
			isRequired = true;
		} 
	});
	var check_email = document.getElementById('check-signup-email'),
		check_pass = document.getElementById('check-password-0');
	if (!isRequired && check_email.innerHTML=='' && check_pass.innerHTML=='matching!') {
		$.ajax({
	        type : "POST",
	        url  : url,
	        data : form.serialize(),
	        success : function(response) {
	        	//console.log(response);
	        	data = JSON.parse(response);
	        	login_state = true;
	        	form[0].reset();
	        	closeSign();
	        	login_auth();
	        	/*if (response != 'err') {
	        		login_state = true;
	        		form[0].reset();
	        		$("#check-signup-email").html("");
	        		$("#check-password").html("");
	        		closeSign();
	        		login_auth();
	        	} else {
	        		alert('You are already registered!');
	        		form[0].reset();
	        		$("#check-signup-email").html("");
	        		$("#check-password").html("");
	        	}*/
	        	document.getElementById('user-profile').href += '?token='.concat(data.auth_token);
	        	document.getElementById('navi-user-profile').href += '?token='.concat(data.auth_token);
			},
			statusCode: {
				406: function (response) {
					console.log(response);
					error = JSON.parse(response.responseText);
					alert(error.message);
					form[0].reset();
					clearSign();
				}
			}
			/*error: function(error){
	            console.log(error);
	        }*/
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
        success: function(response) {
        	//console.log(response);
        	data = JSON.parse(response);
        	login_state = true;
        	form[0].reset();
        	closeSign();
        	login_auth();
        	/*if (response != 'err') {
        		login_state = true;
        		form[0].reset();
        		closeSign();
        		login_auth();
        	} else {
        		alert('Sorry! The email address or password is incorrect.');
        		form[0].reset();
        	}*/
        	document.getElementById('user-profile').href += '?token='.concat(data.auth_token);
        	document.getElementById('navi-user-profile').href += '?token='.concat(data.auth_token);
        	console.log('user profile> ', document.getElementById('user-profile').href)
		},
		statusCode: {
			406: function (response) {
				error = JSON.parse(response.responseText);
				alert(error.message);
				form[0].reset();
			}
		}
		/*error: function(error){
            console.log('err',error);
        }*/
    });
};

function userReset() {
	console.log('commitResetPwd');

	var form = $('#form_resetpwd');
	var url = API['resetpwd'];
	console.log('url> ',url);

	var check_pass = document.getElementById('check-password-1');
	console.log('resetpwd:',check_pass.innerHTML);

	if(check_pass.innerHTML == 'matching!') {
		$.ajax({
	        type : "POST",
	        url  : url,
	        data : form.serialize(),
	        success: function(response) {
	        	console.log(response);
	        	form[0].reset();
	        	closeSign();
	        	/*if (response != 'err') {
	        		login_state = true;
	        		form[0].reset();
	        		closeSign();
	        		login_auth();
	        	} else {
	        		alert('Sorry! The email address or password is incorrect.');
	        		form[0].reset();
	        	}*/
			},
			statusCode: {
				406: function (response) {
					error = JSON.parse(response.responseText);
					alert(error.message);
					form[0].reset();
					clearSign();
				}
			}
			/*error: function(error){
	            console.log('err',error);
	        }*/
	    });
	}
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
	for (var i=0; i<2; i++) {
		var pass = document.getElementById('password-'+i),
			re_pass = document.getElementById('re-password-'+i),
			check_pass = document.getElementById('check-password-'+i);
		if (pass.value == re_pass.value) {
		    	check_pass.style.color = '#30c1b8';
		    	check_pass.innerHTML = 'matching!';
		  	} else {
		    	check_pass.style.color = '#ef7873';
		    	check_pass.innerHTML = 'not matching!';
		  	}
	}
	/*
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
  	*/
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
	$.ajax({
        type :"POST",
        url  :"http://localhost:8888/api/auth",
        success : function(response) {
        	console.log('success');
        	console.log(response);
        	if (response) {
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

    $('.resetpwd-form').hover(function(){ 
        mouse_is_inside=true; 
    }, function(){ 
        mouse_is_inside=false; 
    });

    $("body").mouseup(function(){ 
        if(! mouse_is_inside) $('#section-sign-in').hide();
        if(! mouse_is_inside) $('#section-sign-up').hide();
        if(! mouse_is_inside) $('#section-reset-pwd').hide();
    });

   	$("a[rel~='keep-params']").click(function(e) {
   	    e.preventDefault();

   	    var params = window.location.search,
   	        dest = $(this).attr('href') + params;

   	    // in my experience, a short timeout has helped overcome browser bugs
   	    window.setTimeout(function() {
   	        window.location.href = dest;
   	    }, 100);
   	});
});
