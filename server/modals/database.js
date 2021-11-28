const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/recipes", {
  useNewUrlParser: true,
  UseUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error: "));
db.once("open", () => {
  console.log("Database Connected");
});

// Models

require("./Category");
require("./Recipe");
