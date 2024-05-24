/********************
 **** LOGIN PAGE ****
 ********************/

const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const form = document.getElementById("form");
const loginApi = "http://localhost:5678/api/users/login";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const emailvalue = inputEmail.value.trim();
  const passwordvalue = inputPassword.value.trim();

  if (emailvalue === "" || passwordvalue === "") {
    msgerror.style.display = "flex";
  } else {
    msgerror.style.display = "none";
  }
});
