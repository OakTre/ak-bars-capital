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
		label: null,
		backgroundColor: 'rgba(0, 178, 169, 1)',
		borderColor: 'rgba(0, 178, 169, 1)',
		data: [0, 10, 5, 2, 20, 30],
	}]
};

const config = {
	type: 'line',
	data: data,
	options: {

	}
};

const ctx = document.querySelector("#chart").getContext("2d");

const myChart = new Chart(
	ctx,
	config
);
