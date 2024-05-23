/********************
 **** LOGIN PAGE ****
 ********************/

const inputs = document.querySelectorAll(
  'input[type="text"], input[type="password"]'
);

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    console.log(e.target.id);
  });
});
