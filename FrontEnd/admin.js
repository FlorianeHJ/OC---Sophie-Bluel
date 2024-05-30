const editionmode = document.querySelector(".editionmode");
const edit = document.querySelector(".edit");

if (localStorage.getItem("token")) {
  edit.style.display = "flex";
  editionmode.style.display = "flex";
  logout.style.display = "flex";
  login.style.display = "none";
} else console.log("nopppppp");

logout.addEventListener("click", (e) => {
  localStorage.removeItem("token");
  window.location.href = "index.html";
});
