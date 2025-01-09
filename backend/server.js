const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const emailRoutes = require("./routes/emailRoutes");
const { startAgenda } = require("./utils/scheduler");
const cors = require("cors");

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors({
  origin: "http://localhost:5173"  
}));

app.use(express.json());

app.use("/api/emails", emailRoutes);

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("MongoDB connection error:", error));

startAgenda();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
