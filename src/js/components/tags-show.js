document.addEventListener("DOMContentLoaded", function (event) {
	$(document).on("click", ".materials__tags-more-btn", (e)=>{
		let $self = $(this);

		$(".materials__tags-more-btn").toggleClass("is-active");

		$(".materials__tags-more").slideToggle();
	});
});
