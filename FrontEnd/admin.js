const editionmode = document.querySelector(".editionmode");
const editBtn = document.querySelector(".editBtn");

if (localStorage.getItem("token")) {
  editBtn.style.display = "flex";
  editionmode.style.display = "flex";
  logout.style.display = "flex";
  login.style.display = "none";
  buttonsContainer.style.display = "none";
  gallery.style.marginTop = "50px";
}

logout.addEventListener("click", (e) => {
  localStorage.removeItem("token");
});
