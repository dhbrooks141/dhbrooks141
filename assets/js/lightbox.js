document.addEventListener("DOMContentLoaded", function () {
	const lightbox = document.getElementById("lightbox");
	const lightboxImg = document.querySelector(".lightbox-img");
	const closeButton = document.querySelector(".lightbox-close");

	document.querySelectorAll(".carousel-track img").forEach(function (image) {
		image.style.cursor = "zoom-in";

		image.addEventListener("click", function () {
			lightboxImg.src = image.src;
			lightboxImg.alt = image.alt;
			lightbox.classList.add("is-open");
		});
	});

	closeButton.addEventListener("click", closeLightbox);

	lightbox.addEventListener("click", function (event) {
		if (event.target === lightbox) {
			closeLightbox();
		}
	});

	document.addEventListener("keydown", function (event) {
		if (event.key === "Escape") {
			closeLightbox();
		}
	});

	function closeLightbox() {
		lightbox.classList.remove("is-open");
		lightboxImg.src = "";
	}
});
