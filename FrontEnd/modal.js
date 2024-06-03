const modal = document.querySelector(".modal");
const modal1 = document.querySelector(".modal1");
const modal2 = document.querySelector(".modal2");
const modalCloseBtn = document.getElementsByClassName("modalCloseBtn");
const modalCloseArrow = document.querySelector(".modalCloseArrow");
const displayPhoto = document.querySelector(".displayPhoto");
const urlDeleteWorks = "http://localhost:5678/api/works/{id}";

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

fetchWorkModal();

const displayWorkModal = (workModal) => {
  displayPhoto.innerHTML = "";

  workModal.forEach(({ title, imageUrl, id }) => {
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");

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
    deleteIcon.addEventListener("click", () => deleteWork(id));
    imgWrapper.appendChild(deleteIcon);

    imgContainer.appendChild(imgWrapper);
    displayPhoto.appendChild(imgContainer);
  });
};

// suppression des oeuvres - modal 1

const requestOptionsDelete = {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  },
};

const deleteWork = (id) => {
  fetch(urlDeleteWorks + id, requestOptionsDelete)
    .then((response) => {
      if (localStorage.getItem("token")) {
        imgContainer.remove();
      } else {
        console.log("Erreur lors de la suppression de l'oeuvre");
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la suppresion de l'oeuvre :", error);
    });
};
