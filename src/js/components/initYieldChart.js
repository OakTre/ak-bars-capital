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
		onSelect({ date, formattedDate, datepicker }) {
			dateText.innerHTML = dayjs(date).format('DD MMMM YYYY');
		}
	})

	// проходимся по всем датам в фондах и инициализируем дейтпикер
	chartDates.forEach((date) => {
		const parent = date.closest(".js-dates-parent");
		const startDate = parent.querySelector(".js-start-date");
		const endtDate = parent.querySelector(".js-end-date");

		new AirDatepicker(date, {
			range: true,
			multipleDatesSeparator: ' - ',
			maxDate: new Date(),
			onSelect({ date, formattedDate, datepicker }) {
				for (let i = 0; i < date.length; i++) {
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

		const dataInfo = [
			{ x: '2021-01-09', y: 2210 },
			{ x: '2021-02-09', y: 1217 },
			{ x: '2021-03-09', y: 4124 },
			{ x: '2021-04-09', y: 3112 },
			{ x: '2021-05-09', y: 1014 },
			{ x: '2021-06-09', y: 2129 },
			{ x: '2021-07-09', y: 4123 },
			{ x: '2021-08-09', y: 3124 },
			{ x: '2021-09-09', y: 7213 },
			{ x: '2021-10-09', y: 9124 },
			{ x: '2021-11-09', y: 3124 },
			{ x: '2021-12-09', y: 4412 },
		]

		const data = {
			datasets: [{
				label: false,
				borderColor: 'rgba(0, 178, 169, 1)',
				fill: true,
				backgroundColor: gradient,
				pointBackgroundColor: "#FC9202",
				pointBorderColor: 'rgba(255, 255, 255, 0.7)',
				pointRadius: 5,
				pointHoverRadius: 5,
				borderWidth: 2,
				// data: [40, 10, 5, 2, 20, 30, 30, 15, 21, 60, 42, 12],
				data: dataInfo,
			}]
		};

		const config = {
			type: 'line',
			data: data,
			options: {
				adapters: {
					date: { locale: 'ru' }
				},
				scales: {
					x: {
						type: 'time',
						time: {
							unit: 'month',
							displayFormats: {
								quarter: 'MM YY'
							}
						}
					}
				},
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						display: false,
						labels: {
							usePointStyle: true,
						},
					},
					tooltip: {
						yAlign: "bottom",
						displayColors: false,
						backgroundColor: "#fff",
						bodyColor: "#10002B",
						padding: 15,
						titleColor: "#959494",
						titleMarginBottom: 9,
						titleFont: {
							weight: "400",
							size: 12,
							lineHeight: 1
						},
						bodyFont: {
							weight: "400",
							size: 14,
							lineHeight: 1
						},
						callbacks: {
							title: function (context) {
								let layout = `Дата:                   ${dayjs(context[0].raw.x).format('DD.MM.YYYY')}`

								return layout;
							},
							label: function (context) {
								let layout = `Стоимость пая: ${context.parsed.y} ₽`

								return layout;
							}

						}
					},
				},
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
