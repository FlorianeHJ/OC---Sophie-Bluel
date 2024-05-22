// URL de l'API à partir de laquelle nous voulons récupérer les oeuvres
const apiworkUrl = "http://localhost:5678/api/works";
const apicategoriesUrl = "http://localhost:5678/api/categories";
const gallery = document.querySelector(".gallery");
const buttonsContainer = document.querySelector(".buttons");

// Récupération des oeuvres
const fetchWork = () => {
  fetch(apiworkUrl).then((response) => {
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des données");
    }
    return response.json();
  });
};

// Récupération des catégories
const fetchCategories = () => {
  fetch(apicategoriesUrl).then((response) => {
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des catégories");
    }
    return response.json();
  });
};

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
const createFilterButtons = (categoriesData, workData) => {
  categoriesData.forEach(({ id, name }) => {
    const button = document.createElement("button");
    button.textContent = name;
    button.addEventListener("click", () => {
      const filteredWorks = workData.filter((work) => work.categoryId === id);
      displayWork(filteredWorks);
    });
    buttonsContainer.appendChild(button);
  });

  // Ajout d'un bouton pour afficher toutes les oeuvres
  const allButton = document.createElement("button");
  allButton.textContent = "Tout";
  allButton.addEventListener("click", () => displayWork(workData));
  buttonsContainer.appendChild(allButton);
};

// Promise all
Promise.all([fetchWork(), fetchCategories()])
  .then(([workData, categoriesData]) => {
    displayWork(workData);
    createFilterButtons(categoriesData, workData);
  })
  .catch((error) => {
    console.error("Erreur:", error);
  });
