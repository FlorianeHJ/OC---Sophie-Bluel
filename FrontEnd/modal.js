// Création des éléments de la modal et des formulaires dynamiquement

const modal = document.createElement("div");
modal.classList.add("modal");
document.body.appendChild(modal);

const modalContainer = document.createElement("div");
modalContainer.classList.add("modalContainer");
modal.appendChild(modalContainer);

const modalClose = document.createElement("div");
modalClose.classList.add("modalClose");
modalContainer.appendChild(modalClose);

const modalCloseBtn = document.createElement("button");
modalCloseBtn.classList.add("modalCloseBtn");
modalCloseBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
modalClose.appendChild(modalCloseBtn);

const titleModal = document.createElement("h2");
titleModal.textContent = "Galerie photos";
titleModal.classList.add("titleModal");
modalContainer.appendChild(titleModal);

const displayPhoto = document.createElement("div");
displayPhoto.classList.add("displayPhoto");
modalContainer.appendChild(displayPhoto);

const addWork = document.createElement("div");
addWork.classList.add("addWork");
modalContainer.appendChild(addWork);

const btnAddWork = document.createElement("button");
btnAddWork.setAttribute("id", "btnAddWork");
btnAddWork.textContent = "Ajouter une photo";
addWork.appendChild(btnAddWork);

const formModal = document.createElement("form");
formModal.classList.add("formModal");
formModal.setAttribute("id", "uploadForm");
modalContainer.appendChild(formModal);

const btnAddFile = document.createElement("button");
btnAddFile.classList.add("btnAddFile");
formModal.appendChild(btnAddFile);

const inputFile = document.createElement("input");
inputFile.setAttribute("type", "file");
inputFile.setAttribute("id", "inputFile");
inputFile.setAttribute("accept", "image/png, image/jpeg");
btnAddFile.appendChild(inputFile);

const imgPreview = document.createElement("img");
imgPreview.classList.add("imgPreview");
imgPreview.setAttribute("id", "imgPreview");
imgPreview.setAttribute("alt", "Image Preview");
btnAddFile.appendChild(imgPreview);

const fileIcon = document.createElement("span");
fileIcon.classList.add("fileIcon");
fileIcon.innerHTML = `<i class="fa-regular fa-image"></i>`;
btnAddFile.appendChild(fileIcon);

const addPhotos = document.createElement("p");
addPhotos.setAttribute("id", "addPhotos");
addPhotos.innerHTML = "+ Ajouter photo";
btnAddFile.appendChild(addPhotos);

const sizeRequired = document.createElement("span");
sizeRequired.setAttribute("id", "sizeRequired");
sizeRequired.innerHTML = "jpg, png : 4mo max";
btnAddFile.appendChild(sizeRequired);

const errorMessage2 = document.createElement("p");
errorMessage2.setAttribute("id", "errorMessage2");
errorMessage2.innerHTML = "L'image dépasse 4 mo, veuillez réessayer";
formModal.appendChild(errorMessage2);

const labelTitre = document.createElement("label");
labelTitre.setAttribute("for", "title");
labelTitre.textContent = "Titre";
formModal.appendChild(labelTitre);

const inputTitre = document.createElement("input");
inputTitre.setAttribute("type", "text");
inputTitre.setAttribute("name", "Titre");
inputTitre.setAttribute("id", "title");
formModal.appendChild(inputTitre);

const errorMessage = document.createElement("p");
errorMessage.setAttribute("id", "errorMessage");
errorMessage.innerHTML = "Veuillez remplir le champ titre";
formModal.appendChild(errorMessage);

const labelCategory = document.createElement("label");
labelCategory.setAttribute("for", "category");
labelCategory.textContent = "Catégorie";
formModal.appendChild(labelCategory);

const selectCategory = document.createElement("select");
selectCategory.setAttribute("name", "categorie");
selectCategory.setAttribute("id", "category");
formModal.appendChild(selectCategory);

const horizontalLigne = document.createElement("div");
horizontalLigne.setAttribute("id", "horizontalLigne");
formModal.appendChild(horizontalLigne);

const options = [
  { value: "3", text: "Hotels & Restaurants" },
  { value: "1", text: "Objets" },
  { value: "2", text: "Appartements" },
];

options.forEach((optionData) => {
  const option = document.createElement("option");
  option.value = optionData.value;
  option.textContent = optionData.text;
  selectCategory.appendChild(option);
});

const modalCloseArrow = document.createElement("button");
modalCloseArrow.classList.add("modalCloseArrow");
modalCloseArrow.innerHTML = `<i class="fa-solid fa-arrow-left"></i>`;
modalClose.appendChild(modalCloseArrow);

const inputSubmit = document.createElement("input");
inputSubmit.setAttribute("type", "submit");
inputSubmit.setAttribute("value", "Valider");
inputSubmit.setAttribute("disabled", "true");
formModal.appendChild(inputSubmit);

const urlDeleteWorks = "http://localhost:5678/api/works/";

// Afficher/masquer la modal

editBtn.addEventListener("click", () => {
  modal.style.display = "flex";
  modalContainer.style.display = "flex";
  modalCloseArrow.style.display = "none";
  formModal.style.display = "none";
  addWork.style.display = "flex";
  displayPhoto.style.display = "flex";
  displayWorkModal(allWork);
});

modalCloseBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modalContainer.style.display = "none";
    modal.style.display = "none";
  }
});

modalCloseArrow.addEventListener("click", () => {
  formModal.style.display = "none";
  modalCloseArrow.style.display = "none";
  titleModal.innerHTML = "Galerie photos";
  displayPhoto.style.display = "flex";
  addWork.style.display = "flex";

  displayWorkModal(allWork);
});

// Affichage dynamique des oeuvres

const displayWorkModal = (workModal) => {
  displayPhoto.innerHTML = "";

  workModal.forEach(({ title, imageUrl, id }) => {
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");
    imgContainer.id = `img-container-${id}`;

    const imgWrapper = document.createElement("div");
    imgWrapper.classList.add("img-wrapper");

    const imgModal = document.createElement("img");
    imgModal.src = imageUrl;
    imgModal.alt = title;
    imgWrapper.appendChild(imgModal);

    imgModal.style.width = "80px";
    imgModal.style.padding = "0px 2px 20px 2px";

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash-can", "delete-icon");
    deleteIcon.addEventListener("click", () => {
      deleteWork(id);
    });
    imgWrapper.appendChild(deleteIcon);

    imgContainer.appendChild(imgWrapper);
    displayPhoto.appendChild(imgContainer);
  });
};

// suppression des oeuvres - modal
const token = localStorage.getItem("token");

const deleteWork = (id) => {
  const requestOptionsDelete = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  fetch(urlDeleteWorks + id, requestOptionsDelete)
    .then((response) => {
      if (response.ok) {
        allWork = allWork.filter((work) => work.id != id);
        displayWorkModal(allWork);
        displayWork(allWork);
      } else {
        console.log("Erreur lors de la suppression de l'oeuvre");
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la suppresion de l'oeuvre :", error);
    });
};

// Afficher l'oeuvre choisie

function previewImage(e) {
  const inputFileImg = e.target;
  const imgPreview = document.getElementById("imgPreview");

  if (inputFileImg.files && inputFileImg.files[0]) {
    const reader = new FileReader();
    reader.onload = function (event) {
      imgPreview.src = event.target.result;
      imgPreview.style.display = "block";
    };
    reader.readAsDataURL(inputFileImg.files[0]);

    fileIcon.style.display = "none";
    addPhotos.style.display = "none";
    sizeRequired.style.display = "none";
    imgPreview.style.maxWidth = "30%";
    btnAddFile.style.padding = "0";
  }
}

inputFile.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file.size > 4 * 1024 * 1024) {
    errorMessage2.style.display = "flex";
  } else {
    errorMessage2.style.display = "none";
    previewImage(e);
  }
  checkFormValidity();
});

function checkFormValidity() {
  const file = inputFile.files[0];
  if (file && file.size <= 4 * 1024 * 1024 && inputTitre.value.trim() !== "") {
    inputSubmit.removeAttribute("disabled");
  } else {
    inputSubmit.setAttribute("disabled", "true");
  }
}

inputTitre.addEventListener("input", checkFormValidity);

// Ajout d'une oeuvre

btnAddWork.addEventListener("click", () => {
  formModal.style.display = "flex";
  addWork.style.display = "none";
  modalCloseArrow.style.display = "flex";
  titleModal.innerHTML = "Ajout photo";
  displayPhoto.style.display = "none";
});

uploadForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (title.value.trim() === "") {
    errorMessage.style.display = "flex";
    return;
  } else {
    errorMessage.style.display = "none";
  }

  if (inputFile.files && inputFile.files[0]) {
    const formData = new FormData();
    formData.append("image", inputFile.files[0]);
    formData.append("title", title.value);
    formData.append("category", category.value);

    const optionsPost = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    };

    fetch("http://localhost:5678/api/works", optionsPost)
      .then((response) => response.json())
      .then((newPhoto) => {
        allWork.push(newPhoto);
        displayWorkModal(allWork);
        displayWork(allWork);

        formModal.reset();
        inputSubmit.setAttribute("disabled", "true");
        imgPreview.style.display = "none";
        fileIcon.style.display = "block";
        addPhotos.style.display = "block";
        sizeRequired.style.display = "block";
        btnAddFile.style.padding = "";

        modalCloseArrow.style.display = "none";
        titleModal.innerHTML = "Galerie photos";
        displayPhoto.style.display = "flex";
        addWork.style.display = "flex";
        formModal.style.display = "none";
      })
      .catch((error) => {
        console.log("Erreur lors de l'ajout de l'oeuvre :", error);
      });
  }
});
