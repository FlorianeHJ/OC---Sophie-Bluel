const modal = document.querySelector(".modal");
const modal1 = document.querySelector(".modal1");
const modal2 = document.querySelector(".modal2");
const modalCloseBtn = document.getElementsByClassName("modalCloseBtn");
const modalCloseArrow = document.querySelector(".modalCloseArrow");
const displayPhoto = document.querySelector(".displayPhoto");
const urlDeleteWorks = "http://localhost:5678/api/works/";

editBtn.addEventListener("click", () => {
  modal.style.display = "flex";
  modal1.style.display = "flex";
  modal2.style.display = "none";
  fetchWorkModal();
});

Array.from(modalCloseBtn).forEach((btn) => {
  btn.addEventListener("click", () => {
    modal.style.display = "none";
  });
});

modalCloseArrow.addEventListener("click", () => {
  modal2.style.display = "none";
  modal1.style.display = "flex";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
  }
});

btnAddWork.addEventListener("click", () => {
  modal1.style.display = "none";
  modal2.style.display = "flex";
});

// Affichage dynamique des oeuvres - modal 1

const fetchWorkModal = () => {
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((dataModal) => {
      console.log(dataModal);
      displayWorkModal(dataModal);
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des œuvres :", error);
    });
};

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
        const imgContainer = document.getElementById(`img-container-${id}`);

        if (imgContainer) {
          imgContainer.remove();
        }
      } else {
        console.log("Erreur lors de la suppression de l'oeuvre");
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la suppresion de l'oeuvre :", error);
    });
};

// Ajout des oeuvres - modal 2

// Afficher l'oeuvre choisie dans la modal 2

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

    const fileIcon = document.querySelector(".fileIcon");
    const btnAddFile = document.querySelector(".btnAddFile");
    fileIcon.style.display = "none";
    addPhotos.style.display = "none";
    sizeRequired.style.display = "none";
    imgPreview.style.maxWidth = "30%";
    btnAddFile.style.padding = "0";
  }
}

document.getElementById("inputFile").addEventListener("change", previewImage);

// Ajout d'une oeuvre - modal 2

uploadForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (inputFile.files && inputFile.files[0]) {
    const formData = new FormData();
    formData.append("image", inputFile.files[0]);
    formData.append("title", title);
    formData.append("category", category);

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
        displayWorkModal([newPhoto]);

        console.log(newPhoto);

        uploadForm.reset();
        modal2.style.display = "none";
        modal1.style.display = "flex";
      })
      .catch((error) => {
        console.log("Erreur lors de l'ajout de l'oeuvre :", error);
      });
  }
});

fetchWorkModal();
