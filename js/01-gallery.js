import { galleryItems } from "./gallery-items.js";

function createGalleryItems() {
	const galleryList = document.querySelector(".gallery");

	galleryItems.forEach((item) => {
		const galleryItem = document.createElement("li");
		galleryItem.classList.add("gallery__item");

		const galleryLink = document.createElement("a");
		galleryLink.classList.add("gallery__link");
		galleryLink.href = item.original;

		const galleryImage = document.createElement("img");
		galleryImage.classList.add("gallery__image");
		galleryImage.src = item.preview;
		galleryImage.alt = item.description;
		galleryImage.setAttribute("data-source", item.original);

		galleryLink.appendChild(galleryImage);
		galleryItem.appendChild(galleryLink);

		galleryList.appendChild(galleryItem);
	});
}

createGalleryItems();

const galleryContainer = document.querySelector(".gallery");
galleryContainer.addEventListener("click", selectGalleryEl);

function selectGalleryEl(event) {
	event.preventDefault();
	if (event.target.nodeName !== "IMG") {
		return;
	}
	const instance = basicLightbox.create(
		`<img src="${event.target.dataset.source}">`,

		{
			onShow: () => {
				window.addEventListener("keydown", onKeydownEsc);
			},
			onClose: () => {
				window.removeEventListener("keydown", onKeydownEsc);
			},
		}
	);

	const onKeydownEsc = (event) => {
		if (event.key === "Escape") {
			instance.close();
		}
	};

	instance.show();
}
