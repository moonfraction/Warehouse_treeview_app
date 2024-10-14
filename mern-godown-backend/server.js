const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.APP_ORIGIN,
    credentials: true,
  })
);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "Warehouse",
  })
  .then(() => {
    console.log(
      `MongoDB connected successfully to database name '${mongoose.connection.name}'`
    );
  })
  .catch((error) => {
    console.log(error);
  });

// Basic route
app.get("/", (req, res) => {
  res.send("Godown API is running successfully");
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Routes
const godownRoutes = require("./routes/godowns");
const itemRoutes = require("./routes/items");

app.use("/api/godowns", godownRoutes);
app.use("/api/items", itemRoutes);
