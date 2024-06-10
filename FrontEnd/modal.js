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
modalContainer.appendChild(btnAddWork);

const urlDeleteWorks = "http://localhost:5678/api/works/";

editBtn.addEventListener("click", () => {
  modal.style.display = "flex";
  modalContainer.style.display = "flex";
  modalCloseArrow.style.display = "none";
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

// suppression des oeuvres - modal 1
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

// Ajout des oeuvres

const modalCloseArrow = document.createElement("button");
modalCloseArrow.classList.add("modalCloseArrow");
modalCloseArrow.innerHTML = `<i class="fa-solid fa-arrow-left"></i>`;
modalClose.appendChild(modalCloseArrow);

btnAddWork.addEventListener("click", () => {
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

  const horizontalLine = document.createElement("div");
  horizontalLine.classList.add("horizontalLine");
  formModal.appendChild(horizontalLine);

  const inputSubmit = document.createElement("input");
  inputSubmit.setAttribute("type", "submit");
  inputSubmit.setAttribute("value", "Valider");

  modalCloseArrow.style.display = "flex";
  titleModal.innerHTML = "Ajout photo";
  displayPhoto.style.display = "none";
});

// modalCloseArrow.addEventListener("click", () => {
//   modal2.style.display = "none";
//   modal1.style.display = "flex";
// });

// Afficher l'oeuvre choisie

// function previewImage(e) {
//   const inputFileImg = e.target;
//   const imgPreview = document.getElementById("imgPreview");

//   if (inputFileImg.files && inputFileImg.files[0]) {
//     const reader = new FileReader();
//     reader.onload = function (event) {
//       imgPreview.src = event.target.result;
//       imgPreview.style.display = "block";
//     };
//     reader.readAsDataURL(inputFileImg.files[0]);

//     fileIcon.style.display = "none";
//     addPhotos.style.display = "none";
//     sizeRequired.style.display = "none";
//     imgPreview.style.maxWidth = "30%";
//     btnAddFile.style.padding = "0";
//   }
// }

// document.getElementById("inputFile").addEventListener("change", previewImage);

// function checkFormValidity() {
//   if (inputFile.files && inputFile.files[0] && title.value.trim() !== "")
//     validateButton.style.backgroundColor = "#1d6154";
// }
// title.addEventListener("input", checkFormValidity);

// // Ajout d'une oeuvre - modal 2

// uploadForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   if (title.value.trim() === "") {
//     errorMessage.style.display = "flex";
//     return;
//   } else {
//     errorMessage.style.display = "none";
//   }

//   if (inputFile.files && inputFile.files[0]) {
//     const formData = new FormData();
//     formData.append("image", inputFile.files[0]);
//     formData.append("title", title.value);
//     formData.append("category", category.value);

//     const optionsPost = {
//       method: "POST",
//       headers: {
//         Authorization: "Bearer " + token,
//       },
//       body: formData,
//     };

//     fetch("http://localhost:5678/api/works", optionsPost)
//       .then((response) => response.json())
//       .then((newPhoto) => {
//         allWork.push(newPhoto);
//         displayWorkModal(allWork);
//         displayWork(allWork);

//         uploadForm.reset();
//         imgPreview.style.display = "none";
//         fileIcon.style.display = "block";
//         addPhotos.style.display = "block";
//         sizeRequired.style.display = "block";
//         btnAddFile.style.padding = "";

//         modal2.style.display = "none";
//         modal1.style.display = "flex";
//       })
//       .catch((error) => {
//         console.log("Erreur lors de l'ajout de l'oeuvre :", error);
//       });
//   }
// });
