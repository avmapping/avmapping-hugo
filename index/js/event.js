let userType = 'audio'; // user type can be 'audio', 'video' or ''
const baseURL = 'https://filmmusic.avmapping.co';
var API = {'signup':   baseURL+'/api/users/signup/',
		   'signin':   baseURL+'/api/users/login/',
		   'signout':  baseURL+'/api/users/logout/',
		   'resetpwd': baseURL+'/users/password/change/'};

const switchNavDisplay = nextState => {
	const loginNavElsAttr = ["nav-user-login", "nav-login"];
	const notloginNavElsAttr = ["navi-user-login", "navi-user-signup", "navi-login", "navi-signup"];

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
};

const logout = (type = 'desktop') => {
	console.log('logout');

	// on logout
	var url = API['signout'];
	$.ajax({
	    type : "POST",
	    url  : url,
	    headers: {
	    	Authorization: "Token "+docCookies.getItem('access_token'),
	    },
	    success : function(response) {
	       	console.log(response);
	       	login_state = false;
	       	docCookies.removeItem('access_token');
	       	console.log(docCookies.keys());
	       	console.log('token', docCookies.getItem('access_token'));
	       	document.getElementById('user-profile').href = document.getElementById('user-profile').href.split('?')[0];
	       	document.getElementById('navi-user-profile').href = document.getElementById('navi-user-profile').href.split('?')[0];
		},
		statusCode: {
			401: function (response) {
				console.log(response);
				docCookies.removeItem('access_token');
				console.log(docCookies.keys());
	       		console.log('token', docCookies.getItem('access_token'));
			}
		}
	});

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
	//document.getElementById('section-reset-pwd').style.display = 'none';
};

const resetpwd = (type = 'desktop') => {
	console.log('resetpwd');

	closePhoneNaviMenu();
	document.getElementById('section-sign-in').style.display = 'none';
	document.getElementById('section-sign-up').style.display = 'none';
	//document.getElementById('section-reset-pwd').style.display = 'block';
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
	//document.getElementById('section-reset-pwd').style.display = 'none';
	clearSign();
};

function clearSign() {
	for (var i=0; i<1; i++) {
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
	        	login_state = true;
	        	form[0].reset();
	        	closeSign();
	        	
	        	docCookies.setItem('access_token', response.key);
	        	login_auth();
	        	document.getElementById('user-profile').href += '?token='.concat(docCookies.getItem('access_token'));
	        	document.getElementById('navi-user-profile').href += '?token='.concat(docCookies.getItem('access_token'));
			},
			statusCode: {
				400: function (response) {
					console.log(response);
					error = JSON.parse(response.responseText);
					for (var key in error) {
						alert(error[key][0]);
					}
					form[0].reset();
					clearSign();
				}
			}
	    });
	}
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
        	login_state = true;
        	form[0].reset();
        	closeSign();

        	docCookies.setItem('access_token', response.key);
        	login_auth();
        	document.getElementById('user-profile').href += '?token='.concat(docCookies.getItem('access_token'));
        	document.getElementById('navi-user-profile').href += '?token='.concat(docCookies.getItem('access_token'));
        	console.log('user profile> ', document.getElementById('user-profile').href)
		},
		statusCode: {
			400: function (response) {
				console.log(response)
				error = JSON.parse(response.responseText);
				alert(error.non_field_errors);
				form[0].reset();
			}
		}
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
			},
			statusCode: {
				406: function (response) {
					error = JSON.parse(response.responseText);
					alert(error.message);
					form[0].reset();
					clearSign();
				}
			}
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
	for (var i=0; i<1; i++) {
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
};

function login_auth() {
	console.log(docCookies.keys())
	console.log('token', docCookies.getItem('access_token'));
	console.log(docCookies.hasItem('access_token'));
	if (docCookies.getItem('access_token') == null) {
		login_state = false;	
	} else {
		login_state = true;
	};

	if (login_state) {
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
    login_auth();

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
        //if(! mouse_is_inside) $('#section-reset-pwd').hide();
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
