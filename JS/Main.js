/* =========================================================
   DOM ELEMENTS
========================================================= */
const searchInput = document.getElementById("sarchBar");
const searchBtn = document.getElementById("searchBtn");
const container = document.querySelector(".ProductSectionCards");
const loader = document.getElementById("loader");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalInstructions = document.getElementById("modalInstructions");
const closeModal = document.getElementById("closeModal");

/* = INITIAL LOAD  ==*/
fetchMeals("");

/* =========================================================
   SEARCH ON BUTTON CLICK
========================================================= */
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  fetchMeals(query);
});

/* =========================================================
   FETCH MEALS FROM API
========================================================= */
function fetchMeals(query) {
  showLoader(true);

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then(res => res.json())
    .then(data => {
      showLoader(false);

      if (!data.meals) {
        container.innerHTML = "<h3>No recipes found 😥</h3>";
        return;
      }

      showMeals(data.meals);
    })
    .catch(() => {
      showLoader(false);
      container.innerHTML = "<h3>Something went wrong ⚠️</h3>";
    });
}

/* =========================================================
   SHOW MEALS
========================================================= */
function showMeals(meals) {
  container.innerHTML = "";

  meals.forEach(meal => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <h3>${meal.strMeal}</h3>
      <p>${meal.strInstructions.slice(0, 100)}...</p>
      <div class="btn">
        <button class="viewBtn">View Details</button>
      </div>
    `;

    container.appendChild(card);

    // Safe click listener for modal
    card.querySelector(".viewBtn").addEventListener("click", () => {
      viewDetails(meal);
    });
  });
}

/* =========================================================
   LOADER CONTROL
========================================================= */
function showLoader(state) {
  if (state) {
    loader.style.display = "block";
    container.classList.add("hidden");
  } else {
    loader.style.display = "none";
    container.classList.remove("hidden");
  }
}

/* =========================================================
   VIEW DETAILS MODAL
========================================================= */
function viewDetails(meal) {
  modalImg.src = meal.strMealThumb;
  modalTitle.textContent = meal.strMeal;
  modalInstructions.textContent = meal.strInstructions;

  modal.classList.add("show");
}


/* =========================================================
   CLOSE MODAL
========================================================= */
// Close button
closeModal.addEventListener("click", () => {
  modal.classList.remove("show");
});

// Outside click
modal.addEventListener("click", e => {
  if (e.target === modal) {
    modal.classList.remove("show");
  }
});

// Keyboard (ESC / Enter)
document.addEventListener("keydown", e => {
  if (e.key === "Escape" || e.key === "Enter") {
    modal.classList.remove("show");
  }
});

