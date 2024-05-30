const editionmode = document.querySelector(".editionmode");
const edit = document.querySelector(".edit");

if (localStorage.getItem("token")) {
  edit.style.display = "flex";
} else console.log("nopppppp");
