require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./controllers/authController");
const recipesRoutes = require("./controllers/recipeController");
const userRoutes = require("./controllers/userController");
const PORT = process.env.PORT || 4000;

//app
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/auth", authRoutes);
app.use("/recipes", recipesRoutes);
app.use("/user", userRoutes);

//Connecting to mongoDB and starting the server only if the connection worked
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `connected to DB and listening running on : http://localhost:${PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
