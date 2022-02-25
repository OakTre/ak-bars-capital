document.addEventListener("DOMContentLoaded", function (event) {
	const btnsInit = document.querySelectorAll(".js-init-chart");
	const charts = document.querySelectorAll(".js-yield-info-chart");

	let myCharts = [];

	let dateText = document.querySelector(".js-date-text");
	const chartDates = document.querySelectorAll(".js-yield-info-dates");

	// подставляем текущую дату
	dateText.innerHTML = dayjs(new Date()).format('DD MMMM YYYY');

	// инициализируем дайтпикер
	new AirDatepicker('.js-dates', {
		maxDate: new Date(),
		onSelect({date, formattedDate, datepicker}) {
			dateText.innerHTML = dayjs(date).format('DD MMMM YYYY');
		}
	})

	// проходимся по всем датам в фондах и инициализируем дейтпикер
	chartDates.forEach((date)=>{
		const parent = date.closest(".js-dates-parent");
		const startDate = parent.querySelector(".js-start-date");
		const endtDate = parent.querySelector(".js-end-date");

		new AirDatepicker(date, {
			range: true,
			multipleDatesSeparator: ' - ',
			maxDate: new Date(),
			onSelect({date, formattedDate, datepicker}) {
				for (let i =0; i<date.length; i++) {
					startDate.innerHTML = dayjs(date[0]).format('DD MMMM YYYY');
					endtDate.innerHTML = dayjs(date[1]).format('DD MMMM YYYY');
				}
			}
		})
	});

	// проходимся по всем фондам и инициализируем графики
	charts.forEach((chart) => {
		const ctx = chart.getContext("2d");
		const gradient = ctx.createLinearGradient(0, 0, 0, 380);
		gradient.addColorStop(0, 'rgba(0, 178, 169, 0.2)');
		gradient.addColorStop(1, 'rgba(0, 178, 169, 0)');

		const labels = [
			dayjs(new Date()).format(' MMM YY'),
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

		let chartNew = new Chart(
			ctx,
			config
		);

		myCharts.push(chartNew);
	});


	btnsInit.forEach((btn) => {
		btn.addEventListener("click", () => {
			// какие-то действия для обновления графиков, хз может запрос какой-то



			// myChart.update();
		});
	});
});
