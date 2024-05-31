const editBtn = document.querySelector(".editBtn");
const modal = document.querySelector(".modal");
const modalCloseBtn = document.querySelector(".modalCloseBtn");

editBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

modalCloseBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
