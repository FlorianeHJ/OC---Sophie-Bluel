const modal = document.querySelector(".modal");
const modal1 = document.querySelector(".modal1");
const modal2 = document.querySelector(".modal2");
const modalCloseBtn = document.getElementsByClassName("modalCloseBtn");
const modalCloseArrow = document.querySelector(".modalCloseArrow");
const displayPhoto = document.querySelector(".displayPhoto");

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

  workModal.forEach(({ title, imageUrl }) => {
    const imgModal = document.createElement("img");
    imgModal.src = imageUrl;
    imgModal.alt = title;
    displayPhoto.appendChild(imgModal);

    imgModal.style.width = "70px";
    imgModal.style.padding = "5px";
  });
};
