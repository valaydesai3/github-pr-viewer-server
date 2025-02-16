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
    const { page=1 } = req.query;

    try {
        const response = await axios.get(GITHUB_API, {
            params: { page },
            headers: GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}`} : {},
        });

        const transformedPRs = response.data.map(pr => ({
            id: pr.id,
            number: pr.number,
            title: pr.title,
            author: pr.user.login,
            labels: pr.labels.map(label => ({
                name: label.name,
                color: `#${label.color}`,
                description: label.description
              })),
            created_at: pr.created_at,
            url: pr.html_url,
          }));

        // Extract pagination info from GitHub’s response headers
        const linkHeader = response.headers.link;
        let hasNextPage = false;
        let hasPrevPage = page > 1; // First page has no previous page

        if (linkHeader) {
            hasNextPage = linkHeader.includes('rel="next"');
        }

        res.json({
            prs: transformedPRs,
            hasNextPage,
            hasPrevPage,
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch PRs" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));