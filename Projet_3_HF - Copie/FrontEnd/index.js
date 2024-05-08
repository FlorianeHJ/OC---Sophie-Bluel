function fetchWorks() {
  fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((data) => console.log(data[1]));
}

fetchWorks();

const work = document.querySelector(".gallery");
