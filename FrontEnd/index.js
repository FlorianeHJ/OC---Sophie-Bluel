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

      allButton.addEventListener("click", () => {
        displayWork(allWork);
        buttonsContainer.querySelectorAll("button").forEach((btn) => {
          btn.classList.remove("selected");
        });

        allButton.classList.add("selected");
      });
      allButton.classList.add("filter-button");
      allButton.classList.add("selected");
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
const displayWork = (workData, isModal = false) => {
  const container = isModal ? displayPhoto : gallery;
  container.innerHTML = "";

  workData.forEach(({ imageUrl, title }) => {
    const element = isModal
      ? document.createElement("img")
      : document.createElement("figure");

    if (isModal) {
      element.src = imageUrl;
      element.alt = title;
    } else {
      const imageElement = document.createElement("img");
      imageElement.src = imageUrl;
      imageElement.alt = title;

      const titleElement = document.createElement("h3");
      titleElement.textContent = title;

      element.appendChild(imageElement);
      element.appendChild(titleElement);
    }

    container.appendChild(element);
  });
};

// Création des boutons de filtres
const createFilterButtons = (categoriesData) => {
  categoriesData.forEach(({ id, name }) => {
    const button = document.createElement("button");
    button.textContent = name;
    button.classList.add("filter-button");

    button.addEventListener("click", () => {
      filterByCategories(id);
      buttonsContainer.querySelectorAll("button").forEach((btn) => {
        btn.classList.remove("selected");
      });

      button.classList.add("selected");
    });
    buttonsContainer.appendChild(button);
  });
};

const filterByCategories = (categoryId) => {
  const workFiltered = allWork.filter((work) => work.categoryId === categoryId);
  displayWork(workFiltered);
};

// console.log(localStorage.getItem("token"));
