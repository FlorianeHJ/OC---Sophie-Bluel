const editionmode = document.querySelector(".editionmode");
const editBtn = document.querySelector(".editBtn");

if (localStorage.getItem("token")) {
  editBtn.style.display = "flex";
  editionmode.style.display = "flex";
  logout.style.display = "flex";
  login.style.display = "none";
}

logout.addEventListener("click", (e) => {
  localStorage.removeItem("token");
});
