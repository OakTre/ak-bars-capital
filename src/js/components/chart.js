document.addEventListener("DOMContentLoaded", function (event) {
	const ctx = document.querySelector("#chart").getContext("2d");
	const gradient = ctx.createLinearGradient(0, 0, 0, 380);

	gradient.addColorStop(0, 'rgba(0, 178, 169, 0.2)');
	gradient.addColorStop(1, 'rgba(0, 178, 169, 0)');

	function generateLabels() {
        var chartLabels = [];
        for (x = 0; x < 100; x++) {
            chartLabels.push("Label" + x);
        }
        return chartLabels;
    }

    function generateData() {
        var chartData = [];
        for (x = 0; x < 100; x++) {
            chartData.push(Math.floor((Math.random() * 100) + 1));
        }
        return chartData;
    }

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


	const myChart = new Chart(
		ctx,
		config
	);
});
