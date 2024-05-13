// URL de l'API à partir de laquelle nous voulons récupérer les oeuvres
const apiworkUrl = "http://localhost:5678/api/works";
const apicategoriesUrl = "http://localhost:5678/api/categories";
const gallery = document.querySelector(".gallery");

// Récupération des oeuvres

fetch(apiworkUrl)
  .then((response) => {
    // Vérification de la réponse HTTP
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des données");
    }
    // Conversion de la réponse en format JSON
    return response.json();
  })
  .then((workData) => {
    console.log(workData);
    // Utilisation du destructuring pour les items
    workData.forEach(({ title, imageUrl }) => {
      const figureElement = document.createElement("figure");

      const imageElement = document.createElement("img");
      imageElement.src = imageUrl;
      // Spécification pour texte alternatif
      imageElement.alt = title;

      const titleElement = document.createElement("h3");
      titleElement.textContent = title;

      figureElement.appendChild(imageElement);
      figureElement.appendChild(titleElement);
      gallery.appendChild(figureElement);
    });
  })
  .catch((error) => {
    // Gestion des erreurs
    console.error("Erreur :", error);
  });

// Récupération des catégories
fetch(apicategoriesUrl)
  .then((res) => res.json())
  .then((categoriesData) => console.log(categoriesData));

// Fonction pour filtrer les oeuvres par leur catégories de filtre ID
function filterWorksByCatergories(catergoryId) {
  return workData.filter((work) => work.catergoryId === catergoryId);
}

document.getElementById("objects").addEventListener("click", function () {
  const filteredWorks = filterWorksByCatergories(1);
});
