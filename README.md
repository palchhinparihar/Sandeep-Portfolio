# Sandeep Portfolio

A personal portfolio project showcasing Sandeep's work, skills and contact information. This repository contains a frontend (built with Vite) and a backend (API and/or content serving). The repository is organized to separate concerns so the frontend can be developed and deployed independently from the backend.

Table of contents
- [Project overview](#project-overview)
- [Tech stack](#tech-stack)
- [Repository structure](#repository-structure)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Frontend - local setup](#frontend---local-setup)
  - [Backend - local setup](#backend---local-setup)
  - [Run frontend + backend together](#run-frontend--backend-together)
- [Build & deploy](#build--deploy)
- [Environment variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Project overview
This repository contains the source code for Sandeep's portfolio website. It includes:
- A frontend app (UI) located in `frontend/` (Vite-based).
- A backend service located in `backend/` (API, content management or server-side rendering — check backend folder for details).

The goal is to present Sandeep's projects, experience, and contact information in a clean, responsive layout.

## Tech stack
- Frontend: Vite (see `frontend/package.json` for the exact framework and dependencies)
- Backend: (see `backend/` for implementation details — could be Node/Express, Next.js API routes, or another server)
- Build tooling: Vite, npm/yarn
- Optional: any 3rd-party services or databases referenced in backend configuration

## Repository structure
- frontend/ — the client application (HTML/CSS/JS, Vite config, package.json)
  - public/ — static assets
  - src/ — source code for the frontend
- backend/ — backend API or server code
- README.md — this document

Note: Each subfolder may contain its own README with more precise instructions. Start by checking `frontend/README.md` and `backend/README.md` if present.

## Getting started

### Prerequisites
- Node.js (LTS recommended)
- npm (or yarn/pnpm)
- Git

### Frontend - local setup
1. Open a terminal and change to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```
3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. Open the app in your browser. Vite typically serves at http://localhost:5173 (check terminal output).

If you need to build for production:
```bash
npm run build
# preview the production build
npm run preview
```

Check `frontend/package.json` for the exact script names and the frontend framework (React / Vue / Svelte / Vanilla).

### Backend - local setup
1. Change to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```
3. Configure environment variables (see the [Environment variables](#environment-variables) section).
4. Start the backend server:
   ```bash
   npm start
   # or
   npm run dev
   ```
The exact commands depend on the backend implementation. If a `backend/README.md` exists, follow its instructions.

### Run frontend + backend together
Open two terminals:
- Terminal 1:
  ```bash
  cd backend
  npm run dev
  ```
- Terminal 2:
  ```bash
  cd frontend
  npm run dev
  ```

If the frontend needs to call the backend API, ensure the frontend's API base URL points to the backend's running URL (e.g., `http://localhost:5000`).

## Build & deploy
- Build the frontend: `cd frontend && npm run build`
- Build or prepare the backend per the backend project's instructions.
- Deploy static frontend assets to a static host (Netlify, Vercel, GitHub Pages, S3 + CloudFront) or serve them via the backend.
- Deploy the backend to a node hosting provider (Heroku, Render, Railway, DigitalOcean, AWS, etc.), and configure environment variables there.

## Environment variables
Create a `.env` file in the appropriate directory (backend and/or frontend) and add required keys. Common examples:
- Backend:
  - PORT=5000
  - DATABASE_URL=your_database_connection_string
  - JWT_SECRET=your_jwt_secret
- Frontend:
  - VITE_API_BASE_URL=http://localhost:5000

Always avoid committing secrets to the repository. Add `.env` to `.gitignore`.

## Contributing
Contributions are welcome. Suggested workflow:
1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Make changes, add tests if applicable.
4. Commit and push your branch.
5. Open a pull request describing the change.

Please run linters and tests (if any) before opening a PR.

## License
No license is specified in this repository. If you want to apply a license, add a `LICENSE` file (for example, MIT). If you're the repository owner, choose an appropriate open-source license.

## Contact
- GitHub: [palchhinparihar](https://github.com/palchhinparihar)
- For questions or feature requests, open an issue in this repository.

Thank you for checking out the Sandeep Portfolio repository!
