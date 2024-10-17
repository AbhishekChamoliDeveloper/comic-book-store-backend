const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const comicBookRoutes = require("./routes/comicBookRoutes");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
connectDB();

app.use(bodyParser.json());
app.use("/api/comic-books", comicBookRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
