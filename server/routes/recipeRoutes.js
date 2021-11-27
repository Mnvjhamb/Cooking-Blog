const express = require("express");
const router = express.Router();

const recipeController = require("../controllers/recipeController");

// App Routes
router.get("/", recipeController.home);

module.exports = router;
