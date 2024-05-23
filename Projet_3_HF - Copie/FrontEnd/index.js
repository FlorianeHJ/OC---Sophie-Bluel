/********************
 *** LANDING PAGE ***
 ********************/

// URL de l'API à partir de laquelle nous voulons récupérer les oeuvres
const apiworkUrl = "http://localhost:5678/api/works";
const apicategoriesUrl = "http://localhost:5678/api/categories";
const gallery = document.querySelector(".gallery");
const buttonsContainer = document.querySelector(".buttons");
let allWork = [];

// Récupération des oeuvres
const fetchWork = () => {
  fetch(apiworkUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données");
      }
      return response.json();
    })
    .then((data) => {
      allWork = data;
      displayWork(allWork);

      // Ajout d'un bouton pour afficher toutes les oeuvres
      const allButton = document.createElement("button");
      allButton.textContent = "Tous";
      allButton.addEventListener("click", () => displayWork(allWork));
      buttonsContainer.appendChild(allButton);
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
      return response.json();
    })
    .then((data) => {
      createFilterButtons(data);
    });
};

fetchCategories();

// Ajout des oeuvres de manière dynamique
const displayWork = (workData) => {
  gallery.innerHTML = ""; // Clear previous work

  workData.forEach(({ title, imageUrl }) => {
    const figureElement = document.createElement("figure");

    const imageElement = document.createElement("img");
    imageElement.src = imageUrl;
    imageElement.alt = title;

    const titleElement = document.createElement("h3");
    titleElement.textContent = title;

    figureElement.appendChild(imageElement);
    figureElement.appendChild(titleElement);
    gallery.appendChild(figureElement);
  });
};

// Création des boutons de filtres
const createFilterButtons = (categoriesData) => {
  categoriesData.forEach(({ id, name }) => {
    const button = document.createElement("button");
    button.textContent = name;
    button.addEventListener("click", () => {
      filterByCategories(id);
    });
    buttonsContainer.appendChild(button);
  });
};

const filterByCategories = (categoryId) => {
  const workFiltered = allWork.filter((work) => work.categoryId === categoryId);
  displayWork(workFiltered);
};

/********************
 **** LOGIN PAGE ****
 ********************/
