// URL de l'API à partir de laquelle nous voulons récupérer les oeuvres
const apiworkUrl = "http://localhost:5678/api/works";
const gallery = document.querySelector(".gallery");

// Récupération des oeuvres
function fetchWorks() {
  fetch(apiworkUrl)
    .then((response) => {
      // Vérification de la réponse HTTP
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données");
      }
      // Conversion de la réponse en format JSON
      return response.json();
    })
    .then((data) => {
      console.log(data);
      data.forEach(({ title, imageUrl }) => {
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
}
fetchWorks();
