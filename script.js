let recipesData = [];

document.getElementById("fetch-recipes").addEventListener("click", async () => {
    const ingredients = document.getElementById("ingredients").value;

    if (!ingredients) {
        alert("Please enter ingredients!");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/recipes?ingredients=${ingredients}`);
        const data = await response.json();
        recipesData = data;

        if (data.error) {
            alert(data.error);
            return;
        }

        // Display recipes
        const recipesList = document.getElementById("recipes");
        recipesList.innerHTML = ""; // Clear previous results

        data.forEach(recipe => {
            const recipeItem = document.createElement("div");
            recipeItem.classList.add("recipe-item");

            const img = document.createElement("img");
            img.src = recipe.image;  // Set image source
            img.alt = recipe.title;
            img.classList.add("recipe-image");

            const title = document.createElement("h3");
            title.textContent = recipe.title;

            recipeItem.appendChild(img);
            recipeItem.appendChild(title);
            recipesList.appendChild(recipeItem);
        });
        
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
});

document.getElementById("fetch-choice").addEventListener("click", async () => {
    const userChoice = document.getElementById("recipeChoice").value;
    console.log(userChoice)
    console.log(recipesData)
    let rChosen = recipesData.filter(
        function(recipesData) {
          return recipesData.title == userChoice
        }
      )
    let recipeId = rChosen[0].id;

    if (!ingredients) {
        alert("Please enter a recipe!");
        return;
    }
    console.log(rChosen);
    console.log(recipeId);

    try {
        console.log(`http://localhost:3000/recipe/${recipeId}`)
        const response = await fetch(`http://localhost:3000/recipe/${recipeId}`);
        const data = await response.json();

        if (data.error) {
            document.getElementById("recipeInfo").innerHTML = `<p>${data.error}</p>`;
            return;
        }
        console.log(data);

        // Display recipe details
        document.getElementById("recipeInfo").innerHTML = `
            <h2>${data.title}</h2>
            <img src="${data.image}" alt="${data.title}" width="200">
            <p><strong>Servings:</strong> ${data.servings}</p>
            <p><strong>Cooking Time:</strong> ${data.readyInMinutes} minutes</p>
            <h3>Ingredients:</h3>
            <ul>${data.extendedIngredients.map(ing => `<li>${ing.original}</li>`).join('')}</ul>
            <h3>Instructions:</h3>
            <p>${data.instructions || "No instructions available."}</p>
        `;
    } catch (error) {
        console.error("Error fetching recipe:", error);
        document.getElementById("recipeInfo").innerHTML = `<p>Failed to fetch recipe.</p>`;
    }
   
})

// document.getElementById("fetch-choice").addEventListener("click", async () => {
//     const recipeId = document.getElementById("recipeId").value;

//     if (!recipeId) {
//         alert("Please enter a recipe ID!");
//         return;
//     }

//     try {
//         const response = await fetch(`http://localhost:3000/recipe/${recipeId}`);
//         const data = await response.json();

//         if (data.error) {
//             document.getElementById("recipeInfo").innerHTML = `<p>${data.error}</p>`;
//             return;
//         }

//         // Display recipe details
//         document.getElementById("recipeInfo").innerHTML = `
//             <h2>${data.title}</h2>
//             <img src="${data.image}" alt="${data.title}" width="200">
//             <p><strong>Servings:</strong> ${data.servings}</p>
//             <p><strong>Cooking Time:</strong> ${data.readyInMinutes} minutes</p>
//             <h3>Ingredients:</h3>
//             <ul>${data.extendedIngredients.map(ing => `<li>${ing.original}</li>`).join('')}</ul>
//             <h3>Instructions:</h3>
//             <p>${data.instructions || "No instructions available."}</p>
//         `;
//     } catch (error) {
//         console.error("Error fetching recipe:", error);
//         document.getElementById("recipeInfo").innerHTML = `<p>Failed to fetch recipe.</p>`;
//     }
// });