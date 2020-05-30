const PLAN_LIST = ['video', 'business', 'musician'];

const PLAN_BUTTON_MAP = {
	video: document.getElementById('video-member'),
	business: document.getElementById('business-member'),
	musician: document.getElementById('musician-member'),
};

const PLAN_CONTENT_MAP = {
	video: document.getElementById('video-member-content'),
	business: document.getElementById('business-member-content'),
	musician: {
		yearly: document.getElementById('musician-member-yearly-content'),
		monthly: document.getElementById('musician-member-monthly-content'),
	},
};

const switchButton = document.getElementById('plan-switch-button');
const switchButtonInput = document.getElementById('plan-switch-button-input');

const clearState = () => {
	PLAN_LIST.forEach((key) => {
		PLAN_BUTTON_MAP[key].classList.remove('active');
	});

	PLAN_LIST.forEach((key) => {
		if (key === 'musician') {
			PLAN_CONTENT_MAP[key].yearly.classList.remove('active');
			PLAN_CONTENT_MAP[key].monthly.classList.remove('active');
		} else {
			PLAN_CONTENT_MAP[key].classList.remove('active');
		}
	});

	switchButtonInput.checked = false;
	switchButton.classList.add('hide');
};

const selectPlan = (type) => {
	clearState();

	PLAN_BUTTON_MAP[type].classList.add('active');

	if (type === 'musician') {
		switchButton.classList.remove('hide');
		PLAN_CONTENT_MAP.musician.monthly.classList.add('active');
	} else {
		PLAN_CONTENT_MAP[type].classList.add('active');
	}
};

const onChangeSwitchValue = () => {
	console.log('change');
	console.log(switchButtonInput.checked);

	if (switchButtonInput.checked) {
		PLAN_CONTENT_MAP.musician.monthly.classList.remove('active');
		PLAN_CONTENT_MAP.musician.yearly.classList.add('active');
	} else {
		PLAN_CONTENT_MAP.musician.monthly.classList.add('active');
		PLAN_CONTENT_MAP.musician.yearly.classList.remove('active');
	}
};
