/********************
 **** LOGIN PAGE ****
 ********************/

const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const form = document.getElementById("form");
const loginApi = "http://localhost:5678/api/users/login";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const emailValue = inputEmail.value.trim();
  const passwordValue = inputPassword.value.trim();

  if (emailValue === "" || passwordValue === "") {
    msgerror.style.display = "flex";
  } else {
    msgerror.style.display = "none";
  }

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: emailValue, password: passwordValue }),
  };

  fetch(loginApi, requestOptions)
    .then((response) => response.json())
    .then((loginData) => {
      if (loginData.token) {
        window.location.href = "login.html";
      } else {
        msgerror2.style.display = "flex";
      }
    });
});
