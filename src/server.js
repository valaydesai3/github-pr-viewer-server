require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;
const GITHUB_API = process.env.GITHUB_API;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

app.get("/api/prs", async (req, res) => {
    const { page=1, per_page=10 } = req.query;

    try {
        const response = await axios.get(GITHUB_API, {
            params: {per_page, page},
            headers: GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}`} : {},
        });

        res.json(response.data);
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch PRs" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));