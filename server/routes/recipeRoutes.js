const express = require("express");
const router = express.Router();

const recipeController = require("../controllers/recipeController");

// App Routes
router.get("/", recipeController.home);
router.get("/categories", recipeController.exploreCategories);
router.get("/recipe/:id", recipeController.exploreRecipe);
router.get("/category/:id", recipeController.exploreCategoryById);
router.post("/search", recipeController.search);
router.get("/explore-latest", recipeController.exploreLatest);
router.get("/explore-random", recipeController.showRandom);

module.exports = router;
