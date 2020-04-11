const ELEMENT_MAP = {
	upload: document.getElementById('upload-instruction'),
	manage: document.getElementById('manage-instruction'),
	manageFiles: document.getElementById('manage-files-instruction'),
};

const changeTutorial = (type, step) => {
	const instructionEl = ELEMENT_MAP[type];
	const imageEls = Array.from(
		instructionEl.getElementsByClassName('gif')[0].getElementsByTagName('img'),
	);
	const tipEls = Array.from(instructionEl.getElementsByClassName('tip'));

	imageEls.forEach((el, index) => {
		if (index + 1 === step) {
			el.classList.add('active');
			tipEls[index].classList.add('active');
		} else {
			el.classList.remove('active');
			tipEls[index].classList.remove('active');
		}
	});
};
