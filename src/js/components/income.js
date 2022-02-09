document.addEventListener("DOMContentLoaded", function (event) {
	const sliders = document.querySelectorAll('.js-range-input');

	const setRangeSlider = (i, val, slider) => {
		let arr = [null, null];
		arr[i] = val;

		slider.noUiSlider.set(arr);
	};

	sliders.forEach(slider => {
		const start = Number(slider.dataset.start);
		const step = Number(slider.dataset.step);
		const min = Number(slider.dataset.min);
		const max = Number(slider.dataset.max);
		const chidInput = slider.closest(".js-range-container").querySelector(".js-range-input-child");

		noUiSlider.create(slider, {
			start: start,
			connect: 'lower',
			step: step,
			range: {
				'min': min,
				'max': max
			}
		});

		slider.noUiSlider.on("update", (values, handle)=>{
			chidInput.value = Math.round(values[0]);
		});

		chidInput.addEventListener("change", (e)=>{
			setRangeSlider(0, e.currentTarget.value, slider);
		})
	});
});
