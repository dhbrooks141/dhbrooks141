document.addEventListener("DOMContentLoaded", function () {
	const lightbox = document.getElementById("lightbox");
	const lightboxImage = document.querySelector(".lightbox-img");
	const closeButton = document.querySelector(".lightbox-close");

	document.addEventListener("click", function (event) {
		const clickedImage = event.target.closest(".carousel-track img");

		if (clickedImage) {
			lightboxImage.src = clickedImage.src;
			lightboxImage.alt = clickedImage.alt;
			lightbox.classList.add("is-open");
			document.body.style.overflow = "hidden";
		}
	});

	function closeLightbox() {
		lightbox.classList.remove("is-open");
		lightboxImage.src = "";
		document.body.style.overflow = "";
	}

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
});
