// URL de l'API à partir de laquelle nous voulons récupérer les oeuvres
const apiworkUrl = "http://localhost:5678/api/works";
const apicategoriesUrl = "http://localhost:5678/api/categories";
const gallery = document.querySelector(".gallery");

// Récupération des oeuvres
const fetchWork = () => {
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
      displayWork(workData);
      // console
      //   .log(workData);
    });
};

// Ajout des oeuvres de manière dynamique
const displayWork = (workData) => {
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
};

fetchWork();

// Récupération des catégories
const fetchCategories = () => {
  fetch(apicategoriesUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des catégories");
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des catégories :", error);
    });
};
// Création du boutton de filtre Objet
const buttons = document.querySelector(".buttons");

const btnObject = document.createElement("button");
btnObject.textContent = "Objets";
buttons.appendChild(btnObject);

// Ajout d'un évènement au click pour filtrer la catégorie "objets"

btnObject.addEventListener("click", () => {
  console.log(btnObject);
});

// Fonction pour filtrer les oeuvres par leur catégories de filtre ID

// function filterWorksByCategories(categoryId) {
//   return workData.filter((work) => work.categoryId === categoryId);
// }
