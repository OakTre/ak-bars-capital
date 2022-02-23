document.addEventListener("DOMContentLoaded", function (event) {
	const select = document.querySelector(".js-detailed-select");

	select.addEventListener("change", (e)=>{
		let self = e.currentTarget;
		let value = self.options[self.selectedIndex].value;

		location.href = value;
	});
});
