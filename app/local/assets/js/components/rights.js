document.addEventListener("DOMContentLoaded", function (event) {
	const rightsBtn = document.querySelector(".js-right-btn");
	const rightsContainer = document.querySelector(".js-right-container");

	rightsBtn.addEventListener("click", ()=>{
		rightsContainer.style.display = "none";
	});
});
