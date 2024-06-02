const modal = document.querySelector(".modal");
const modalCloseBtn = document.querySelector(".modalCloseBtn");
const displayPhoto = document.querySelector(".displayPhoto");

editBtn.addEventListener("click", () => {
  modal.style.display = "flex";
  fetchWorkModal();
});

modalCloseBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

const fetchWorkModal = () => {
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((dataModal) => {
      displayWorkModal(dataModal);
      console.log(dataModal);
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des œuvres :", error);
    });
};

fetchWorkModal();

const displayWorkModal = (workModal) => {
  displayPhoto.innerHTML = "";

  workModal.forEach(({ title, imageURL }) => {
    const imgModal = document.createElement("img");
    imgModal.src = imageURL;
    imgModal.alt = title;
    displayPhoto.appendChild(imgModal);
  });
};
