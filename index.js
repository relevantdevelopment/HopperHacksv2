require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors()); // Enable CORS for frontend requests

const apiKey = process.env.SPOONACULAR_API_KEY;


// API endpoint to send recipe data
app.get('/recipes', async (req, res) => {
    const ingredients = req.query.ingredients; // Get ingredients from the query parameter
    const baseUrl = "https://api.spoonacular.com/recipes/findByIngredients";
    if (!ingredients) {
        return res.status(400).json({ error: "Ingredients are required" });
    }

    try {
        const response = await axios.get(baseUrl, {
            params: {
                ingredients,
                number: 5,
                apiKey: apiKey
            }
        });

        res.json(response.data); // Send JSON data to the client
        console.log(response.data)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch recipes", details: error.response.data });
    }
});

// Route to fetch recipe information
app.get("/recipe/:id", async (req, res) => {
    const recipeId = req.params.id;
    console.log(recipeId)
    if (!recipeId) {
        return res.status(400).json({ error: "Recipe ID is required" });
    }

    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information`, {
            params: { apiKey: process.env.SPOONACULAR_API_KEY }
        });

        res.json(response.data); // Send data to frontend
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch recipe information", details: error.response ? error.response.data : error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
