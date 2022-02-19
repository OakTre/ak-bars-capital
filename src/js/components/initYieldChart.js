document.addEventListener("DOMContentLoaded", function (event) {
	const btnsInit = document.querySelectorAll(".js-init-chart");
	let myChart;

	const labels = [
		'янв `21',
		'фев `21',
		'мар `21',
		'апр `21',
		'май `21',
		'июн `21',
		'июл `21',
		'авг `21',
		'сен `21',
		'окт `21',
		'ноя `21',
		'дек `21',
	];

	const data = {
		labels: labels,
		datasets: [{
			label: false,
			borderColor: 'rgba(0, 178, 169, 1)',
			fill: true,
			backgroundColor: gradient,
			data: [40, 10, 5, 2, 20, 30, 30, 15, 21, 60, 42, 12],
		}]
	};

	const config = {
		type: 'line',
		data: data,
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: {
					display: false
				}
			},
			elements: { point: { radius: 0 } }
		}
	};


	btnsInit.forEach((btn) => {
		btn.addEventListener("click", () => {
			const ctx = btn.closest(".js-chart-parent").querySelector(".js-yield-info-chart").getContext("2d");
			const gradient = ctx.createLinearGradient(0, 0, 0, 380);

			gradient.addColorStop(0, 'rgba(0, 178, 169, 0.2)');
			gradient.addColorStop(1, 'rgba(0, 178, 169, 0)');


			if (btn.className.includes('js-chart-is-active')) {
				btn.classList.remove("js-chart-is-active");
				myChart.destroy();
			} else {
				btnsInit.forEach(el=>{el.classList.remove("js-chart-is-active")});
				btn.classList.add("js-chart-is-active");

				myChart = new Chart(
					ctx,
					config
				);
			}
		});
	});
});
