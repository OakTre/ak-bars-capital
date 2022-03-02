document.addEventListener("DOMContentLoaded", function (event) {
	const ctx = document.querySelector("#chart").getContext("2d");
	const gradient = ctx.createLinearGradient(0, 0, 0, 380);

	gradient.addColorStop(0, 'rgba(0, 178, 169, 0.2)');
	gradient.addColorStop(1, 'rgba(0, 178, 169, 0)');

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

	const dataInfo1 = [
		{ x: '2019-01-09', y: 2210 },
		{ x: '2019-02-09', y: 1217 },
		{ x: '2019-03-09', y: 4124 },
		{ x: '2019-04-09', y: 3112 },
		{ x: '2019-05-09', y: 1014 },
		{ x: '2019-06-09', y: 2129 },
		{ x: '2019-07-09', y: 4123 },
		{ x: '2019-08-09', y: 3124 },
		{ x: '2019-09-09', y: 7213 },
		{ x: '2019-10-09', y: 9124 },
		{ x: '2019-11-09', y: 3124 },
		{ x: '2019-12-09', y: 4412 },

		{ x: '2020-01-09', y: 2210 },
		{ x: '2020-02-09', y: 1217 },
		{ x: '2020-03-09', y: 4124 },
		{ x: '2020-04-09', y: 3112 },
		{ x: '2020-05-09', y: 1014 },
		{ x: '2020-06-09', y: 2129 },
		{ x: '2020-07-09', y: 4123 },
		{ x: '2020-08-09', y: 3124 },
		{ x: '2020-09-09', y: 7213 },
		{ x: '2020-10-09', y: 9124 },
		{ x: '2020-11-09', y: 3124 },
		{ x: '2020-12-09', y: 4412 },

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

	const dataInfo2 = [
		{ x: '2017-01-09', y: 2210 },
		{ x: '2017-02-09', y: 1217 },
		{ x: '2017-03-09', y: 4124 },
		{ x: '2017-04-09', y: 3112 },
		{ x: '2017-05-09', y: 1014 },
		{ x: '2017-06-09', y: 2129 },
		{ x: '2017-07-09', y: 4123 },
		{ x: '2017-08-09', y: 3124 },
		{ x: '2017-09-09', y: 7213 },
		{ x: '2017-10-09', y: 9124 },
		{ x: '2017-11-09', y: 3124 },
		{ x: '2017-12-09', y: 4412 },
		{ x: '2018-01-09', y: 4567 },
		{ x: '2018-02-09', y: 1234 },
		{ x: '2018-03-09', y: 2534 },
		{ x: '2018-04-09', y: 3648 },
		{ x: '2018-05-09', y: 2139 },
		{ x: '2018-06-09', y: 5634 },
		{ x: '2018-07-09', y: 1230 },
		{ x: '2018-08-09', y: 1236 },
		{ x: '2018-09-09', y: 3564 },
		{ x: '2018-10-09', y: 1298 },
		{ x: '2018-11-09', y: 1270 },
		{ x: '2018-12-09', y: 1240 },
		{ x: '2019-01-09', y: 2210 },
		{ x: '2019-02-09', y: 1217 },
		{ x: '2019-03-09', y: 4124 },
		{ x: '2019-04-09', y: 3112 },
		{ x: '2019-05-09', y: 1014 },
		{ x: '2019-06-09', y: 2129 },
		{ x: '2019-07-09', y: 4123 },
		{ x: '2019-08-09', y: 3124 },
		{ x: '2019-09-09', y: 7213 },
		{ x: '2019-10-09', y: 9124 },
		{ x: '2019-11-09', y: 3124 },
		{ x: '2019-12-09', y: 4412 },
		{ x: '2020-01-09', y: 2210 },
		{ x: '2020-02-09', y: 1217 },
		{ x: '2020-03-09', y: 4124 },
		{ x: '2020-04-09', y: 3112 },
		{ x: '2020-05-09', y: 1014 },
		{ x: '2020-06-09', y: 2129 },
		{ x: '2020-07-09', y: 4123 },
		{ x: '2020-08-09', y: 3124 },
		{ x: '2020-09-09', y: 7213 },
		{ x: '2020-10-09', y: 9124 },
		{ x: '2020-11-09', y: 3124 },
		{ x: '2020-12-09', y: 4412 },
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

	const dataInfo3 = [
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

	const dataInfo4 = [
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
			pointBorderColor: 'rgba(0, 0, 0, 0)',
			pointBackgroundColor: 'rgba(0, 0, 0, 0)',
			pointHoverBackgroundColor: '#FC9202',
			pointHoverBorderColor: 'rgba(255, 255, 255, 0.7)',
			// data: [40, 10, 5, 2, 20, 30, 30, 15, 21, 60, 42, 12],
			data: dataInfo,
		}]
	};

	const config = {
		type: 'line',
		data: data,
		plugins: [{
			afterDraw: chart => {
				if (chart.tooltip?._active?.length) {
					let x = chart.tooltip._active[0].element.x;
					let yAxis = chart.scales.y;
					let ctx = chart.ctx;
					ctx.save();
					ctx.beginPath();
					ctx.setLineDash([5, 15]);
					ctx.moveTo(x, yAxis.top);
					ctx.lineTo(x, yAxis.bottom);
					ctx.lineWidth = 1;
					ctx.strokeStyle = '#FC9202';
					ctx.stroke();
					ctx.restore();
				}
			}
		}],
		options: {
			hover: {
				intersect: false,
			},
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
					xAlign: "right",
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


	const myChart = new Chart(
		ctx,
		config
	);


	const chartsDateBtns = document.querySelectorAll(".js-chart-data");

	chartsDateBtns.forEach((btn)=>{
		btn.addEventListener("click", () => {
			let value = btn.value;

			switch (value) {
				case "1year":
					myChart.data.datasets[0].data = dataInfo;
					myChart.update();
					break;
				case "3year":
					myChart.data.datasets[0].data = dataInfo1;
					myChart.update();
					break;
				case "5year":
					myChart.data.datasets[0].data = dataInfo2;
					myChart.update();
					break;
			}
		});
	});

});
