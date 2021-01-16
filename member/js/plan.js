const PLAN_LIST = ['video', 'business', 'musician'];

const PLAN_BUTTON_MAP = {
	video: document.getElementById('video-member'),
	business: document.getElementById('business-member'),
	musician: document.getElementById('musician-member'),
};

const PLAN_CONTENT_MAP = {
	video: {
		yearly: document.getElementById('video-member-yearly-content'),
		monthly: document.getElementById('video-member-monthly-content'),
	},
	business: document.getElementById('business-member-content'),
	musician: {
		yearly: document.getElementById('musician-member-yearly-content'),
		monthly: document.getElementById('musician-member-monthly-content'),
	},
};

const switchButton = {
	video: document.getElementById('video-plan-switch-button'),
	musician: document.getElementById('musician-plan-switch-button'),
};
const switchButtonInput = {
	video: document.getElementById('video-plan-switch-button-input'),
	musician: document.getElementById('musician-plan-switch-button-input'),
};

const clearState = () => {
	PLAN_LIST.forEach((key) => {
		PLAN_BUTTON_MAP[key].classList.remove('active');
		if (key === 'musician' || key === 'video') {
			switchButton[key].classList.add('hide');
			switchButtonInput[key].checked = false;
		}
	});

	PLAN_LIST.forEach((key) => {
		if (key === 'musician' || key === 'video') {
			PLAN_CONTENT_MAP[key].yearly.classList.remove('active');
			PLAN_CONTENT_MAP[key].monthly.classList.remove('active');
		} else {
			PLAN_CONTENT_MAP[key].classList.remove('active');
		}
	});
};

const selectPlan = (type) => {
	clearState();

	PLAN_BUTTON_MAP[type].classList.add('active');

	if (type === 'musician' || type === 'video') {
		switchButton[type].classList.remove('hide');
		PLAN_CONTENT_MAP[type].monthly.classList.add('active');
	} else {
		PLAN_CONTENT_MAP[type].classList.add('active');
	}
};

const onChangeSwitchValue = (type) => {
	console.log('change');
	console.log(switchButtonInput[type].checked);
	if (type === 'musician' || type === 'video') {	
		if (switchButtonInput[type].checked) {
			PLAN_CONTENT_MAP[type].monthly.classList.remove('active');
			PLAN_CONTENT_MAP[type].yearly.classList.add('active');
		} else {
			PLAN_CONTENT_MAP[type].monthly.classList.add('active');
			PLAN_CONTENT_MAP[type].yearly.classList.remove('active');
		}
	}
};

const subscribePlan = (baseUrl, plan, duration) => {
	console.log('subscribePlan '+ baseUrl);
	if(!plan) { 
		alert('此功能尚未開放');
		return false
	}
	const userProfileUrl = API['user_profile'];
	const subscribeVideoMemberUrl = API['subscribe_video_member'];
	$.ajax({
	    type : "GET",
		url  : userProfileUrl,
		headers: {
	    	Authorization: "Token "+docCookies.getItem('access_token'),
	    },		
		success : function(response) {
			console.log(response);			
			if(response.profile && response.profile.length > 0 ) {
				const ref = window.location.href;
				const lang = ref.includes('zh') ? 'zh':'en';
				$.ajax({
					type : "POST",
					url  : subscribeVideoMemberUrl,
					headers: {
						Authorization: "Token "+docCookies.getItem('access_token'),
					},
					data : {
						plan,
						"type": "video",
						duration,
						lang,
						"user_type": response.profile[0].type,
						"name": response.profile[0].name,
						"address": response.profile[0].mailing_address,
						"id_number": response.profile[0].id_number,
						"owner": response.profile[0].owner,
						"mailing_address": response.profile[0].mailing_address,
						"phone": response.profile[0].phone,
					},
					success : function(response) {
						console.log(response);
						const access_token = docCookies.getItem('access_token')
						window.location.href = baseUrl + `dynamicAnalysis/step3?lang=${lang}`+ (access_token ? `&token=${access_token}` : '')
					},
					statusCode: {
						400: function (response) {
							console.log(response);
						}
					}
				});
			} else {
				alert('請先填入所需的會員資料');
				window.location.href = baseUrl + "/user/userInfo"
			}
		},
		statusCode: {
			400: function (response) {
				console.log(response);
			}
		}
	})
};