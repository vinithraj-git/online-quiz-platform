const express = require("express");
const cors = require("cors");
const db = require("./db");
const authRoutes = require("./auth");
const quizRoutes = require("./quiz");
const app = express();
const resultRoutes = require("./result");
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api", authRoutes);
app.use("/api", quizRoutes);
app.use("/api", resultRoutes);
app.get("/", (req, res) => {
    res.send("Online Quiz Platform Server Running");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});