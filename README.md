## GitHub PR Viewer Server

The **GitHub PR Viewer Server** is a Node.js Express server that serves as a proxy to fetch pull requests from the GitHub API. It transforms the response to provide a simplified and structured format for the frontend. The backend also supports pagination and authentication using a GitHub token.

### Features:
- Fetches and formats pull request data from GitHub.
- Supports pagination to navigate through PRs.
- Handles CORS for seamless frontend integration.
- Uses environment variables for flexible configuration.

## 🚀 Setup & Run Locally

### 1️⃣ Prerequisites
- **Node.js** (v18+)
- **Docker** (if running inside a container)

### 2️⃣ Clone the Repository
```sh
git clone https://github.com/valaydesai3/github-pr-viewer-server.git
cd github-pr-viewer-server
```
### 3️⃣ Install Dependencies
```sh
npm install
```

### 4️⃣ Setup Environment Variables
- Create a .env file in the root directory:
```sh
PORT=5000
GITHUB_API=https://api.github.com/repos/divvydose/ui-coding-challenge/pulls
GITHUB_TOKEN=your_github_token
```

### 5️⃣ Run the application
```sh
node .\src\server.js
```

### 🛠️ API Endpoints

| Method | Endpoint        | Description               |
|--------|----------------|---------------------------|
| `GET`  | `/api/prs?page=1` | Fetch PRs with pagination |


### 🐋 Docker Setup (optional)
```sh
docker build -t github-pr-viewer-backend .

docker run --env-file .env -p 5000:5000 github-pr-viewer-backend
```
