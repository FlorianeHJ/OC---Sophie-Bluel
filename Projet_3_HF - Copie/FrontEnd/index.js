const work = document.querySelector(".gallery");

// Récupération des oeuvres
function fetchWorks() {
  fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((data) => console.log(data));
}

for (const work of data) {
  // Création d'un élément de paragraphe pour le titre de l'œuvre
  const titreElement = document.createElement("p");
  titreElement.textContent = work.title;
  // Création d'un élément d'image pour l'URL de l'image de l'œuvre
  const imageElement = document.createElement("img");
  imageElement.src = work.imageUrl;
  // Ajout du titre et de l'image à la galerie
  galerie.appendChild(titreElement);
  galerie.appendChild(imageElement);
}
});

fetchWorks();
