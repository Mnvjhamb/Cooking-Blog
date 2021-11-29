require("../modals/database");
const Category = require("../modals/Category");
const Recipe = require("../modals/Recipe");
const { insertDummyCategory, insertDummyRecipe } = require("../utils");

// GET '/' --- homepage

exports.home = async (req, res) => {
  try {
    const limit = 5;
    const categories = await Category.find({}).limit(limit);
    const latest = await Recipe.find({}).sort({ _id: -1 }).limit(limit);
    const thai = await Recipe.find({ category: "Thai" }).limit(limit);
    const american = await Recipe.find({ category: "American" }).limit(limit);
    const indian = await Recipe.find({ category: "Indian" }).limit(limit);
    const chinese = await Recipe.find({ category: "Chinese" }).limit(limit);
    const mexican = await Recipe.find({ category: "Mexican" }).limit(limit);

    const food = { latest, thai, american, indian, chinese, mexican };
    res.render("index", { title: "Cooking Blog - HOME", categories, food });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

// GET '/categories' --- Categories

exports.exploreCategories = async (req, res) => {
  try {
    const limit = 20;
    const categories = await Category.find({}).limit(limit);
    // console.log(categories);
    res.render("categories", {
      title: "Cooking Blog - CATEGORIES",
      categories,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

// GET '/recipe/:id' --- Recipe

exports.exploreRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    res.render("recipe", {
      title: "Cooking Blog - Recipe",
      recipe,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

// GET '/category/:id' --- Category by id

exports.exploreCategoryById = async (req, res) => {
  try {
    let categoryId = req.params.id;
    const limitNumber = 20;
    const categoryById = await Recipe.find({ category: categoryId }).limit(
      limitNumber
    );
    res.render("categories", {
      title: "Cooking Blog - Categories",
      categoryById,
    });
  } catch (error) {
    res.satus(500).send({ message: error.message || "Error Occured" });
  }
};

// Post '/search' --- Search

exports.search = async (req, res) => {
  try {
    const { searchTerm } = req.body;
    const recipe = await Recipe.find({
      $text: { $search: searchTerm, $diacriticSensitive: true },
    });
    res.render("search", {
      title: "Cooking Blog - Search",
      recipe,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

// GET '/explore-latest' --- Explore Latest

exports.exploreLatest = async (req, res) => {
  try {
    const limit = 20;
    const recipes = await Recipe.find({}).sort({ _id: -1 }).limit(limit);
    res.render("explore-latest", {
      title: "Cooking Blog - Explore Random",
      recipes,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

// GET '/show-random' --- Show Random

exports.showRandom = async (req, res) => {
  try {
    const count = await Recipe.find({}).countDocuments();
    const random = Math.floor(Math.random() * count);
    const recipe = await Recipe.findOne().skip(random).exec();
    res.render("show-random", { title: "Cooking Blog - Show Random", recipe });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

// insert dummy data to database

// insertDummyCategory();
// insertDummyRecipe();
