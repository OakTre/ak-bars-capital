document.addEventListener("DOMContentLoaded", function (event) {
	const btn = document.querySelector(".js-show-full-btn");
	const textContainer = document.querySelector(".js-show-full-txt");

	btn.addEventListener("click", ()=>{
		textContainer.classList.toggle("is-active");
		btn.classList.toggle("is-active");
	});
});
