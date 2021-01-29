let userType = 'audio'; // user type can be 'audio', 'video' or ''
const baseURL = 'https://filmmusic.avmapping.co';
var API = {'signup':   baseURL+'/api/users/signup/',
		   'signin':   baseURL+'/api/users/login/',
		   'signout':  baseURL+'/api/users/logout/',
		   'resetpwd': baseURL+'/api/users/password/reset/',
		   'resetpwd_confirm': baseURL+'/api/users/password/reset/confirm/',
		   'subscribe_video_member':   baseURL+'/api/main/subscribe_video_member/',
		   'user_profile': baseURL+'/api/users/user/',
		   'subscribe_letter': baseURL+'/letter/ca201-1/'
		};
let params = window.location.search;

const switchNavDisplay = nextState => {
	const loginNavElsAttr = ["nav-user-login", "nav-login"];
	const notloginNavElsAttr = ["navi-user-login", "navi-user-signup", "navi-login"];

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

	document.getElementById("nav-user-not-login").classList.remove('hide');
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
	//document.getElementById('section-reset-pwd').style.display = 'none';
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
	        	login_state = true;
	        	form[0].reset();
	        	closeSign();

	        	docCookies.setItem('access_token', response.key);
	        	login_auth();
	        	appendToken(document.getElementById('user-profile'));
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
        	appendToken(document.getElementById('user-profile'));
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

	// var check_pass = document.getElementById('check-password-1');
	// console.log('resetpwd:',check_pass.innerHTML);

	var href = window.location.href;
	if (href.includes('zh')) {
		form[0].lang.value = 'zh';
	}
	else if (href.includes('en')) {
		form[0].lang.value = 'en';
	}
	form[0].target_url.value = href;

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
};

function appendToken(element) {
	let index = element.href.indexOf('?')
	element.href += (index >= 0 ? '&token=' : '?token=').concat(docCookies.getItem('access_token'));
}

function userResetConfirm() {
	console.log('commitResetPwdConfirm');

	var form = $('#form_resetpwd_confirm');
	var url = API['resetpwd_confirm'];
	console.log('url> ',url);

	var check_pass = document.getElementById('check-password-1');
	console.log('resetpwd:',check_pass.innerHTML);

	form[0].uid.value = params.split('forget=')[1].split('/')[0];
	form[0].token.value = params.split('forget=')[1].split('/')[1];

	if (check_pass.innerHTML=='matching!') {
		$.ajax({
	        type : "POST",
	        url  : url,
	        data : form.serialize(),
	        success: function(response) {
	        	console.log(response);
	        	form[0].reset();
	        	closeSign();
	        	document.getElementById('section-sign-in').style.display = 'block';
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

function checkPassword(number) {
		var pass = document.getElementById('password-'+number),
			re_pass = document.getElementById('re-password-'+number),
			check_pass = document.getElementById('check-password-'+number);
		if (pass.value == re_pass.value) {
		    	check_pass.style.color = '#30c1b8';
		    	check_pass.innerHTML = 'matching!';
		  	} else {
		    	check_pass.style.color = '#ef7873';
		    	check_pass.innerHTML = 'not matching!';
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

let subscribing = false
function subscribe() {
	if (subscribing) return
	const email = $('#newsletter-input').val()
	const url = API['subscribe_letter']
	subscribing = true

    $.ajax({
      method: 'POST',
      url: url,
      contentType : 'application/json; charset=utf-8',
      data: JSON.stringify({mail: email, name: ''}),
      success: () => {
		alert('訂閱成功')
		subscribing = false
      },
      error: () => {
        alert('訂閱失敗請再試一次')
        subscribing = false
      }
    })
    return false
  }
  
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

    $('.resetpwd-confirm-form').hover(function(){ 
        mouse_is_inside=true; 
    }, function(){ 
        mouse_is_inside=false; 
    });

    $("body").mouseup(function(){ 
        if(! mouse_is_inside) $('#section-sign-in').hide();
        if(! mouse_is_inside) $('#section-sign-up').hide();
        if(! mouse_is_inside) $('#section-reset-pwd').hide();
        if(! mouse_is_inside) $('#section-reset-pwd-confirm').hide();
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

   	if (params.includes('forget=')) {
   		console.log('forgetpwd');
   		document.getElementById('section-reset-pwd-confirm').style.display = 'block';
   	}
});

window.onload = () => {
	//判斷網址上有#register 就打開註冊彈窗
	if(location.hash === '#register'){
		document.getElementById('section-sign-up').style.display = 'block';
	}
	//置入 登入的註冊連結
	$("#signup_a").attr("href",`${location.href}#register`); 

	const ref = window.location.href;
	const lang = ref.includes('zh') ? 'zh':'en';
	const access_token = docCookies.getItem('access_token')
	$("#user-profile").attr("href",`https://app.avmapping.co/#/?lang=${lang}`+ (access_token ? `&token=${access_token}` : '')); 
	$("#user-profile").remove();
};