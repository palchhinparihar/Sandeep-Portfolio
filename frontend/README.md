# Sandeep Portfolio

Personal freelance client portfolio website for Sandeep, built as a split frontend/backend project. The frontend presents the portfolio experience, and the backend serves the testimonials API used by the site.

## Overview

- Frontend: React + Vite app in [frontend/](frontend)
- Backend: Express + MongoDB API in [backend/](backend)
- Main content: home, about, experience, certificates, clients, gallery, skills, testimonials, and contact sections

## Tech Stack

- React 19
- Vite 6
- Tailwind CSS 4
- Framer Motion
- AOS
- React Router
- Express 5
- MongoDB with Mongoose

## Repository Structure

- [frontend/](frontend) - client application
  - [frontend/src/](frontend/src) - React source code
  - [frontend/public/](frontend/public) - static assets
- [backend/](backend) - API server and database models
- [README.md](README.md) - project overview and setup

## Local Setup

### Prerequisites

- Node.js 18 or newer
- npm
- MongoDB connection string for the backend

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend development server runs on the default Vite port, usually http://localhost:5173.

Available scripts in [frontend/package.json](frontend/package.json):

- `npm run dev` - start the dev server
- `npm run build` - build for production
- `npm run preview` - preview the production build
- `npm run lint` - run ESLint

### Backend

```bash
cd backend
npm install
npm run dev
```

The backend listens on port 3000 by default, as defined in [backend/index.js](backend/index.js).

Create a [backend/.env](backend/.env) file with:

```bash
DB_URI=your_mongodb_connection_string
```

## Running the Full App

1. Start the backend from [backend/](backend).
2. Start the frontend from [frontend/](frontend).
3. Open the frontend in your browser and verify the testimonials section loads data from the API.

Note: the frontend currently points testimonials requests to the deployed API URL in [frontend/src/api/testimonials.js](frontend/src/api/testimonials.js). If you want to test locally, switch that base URL to `http://localhost:3000/api/testimonials`.

## API Endpoints

The backend exposes the testimonials routes under `/api/testimonials`.

- `GET /` - health message
- `GET /api/testimonials` - fetch all testimonials
- `POST /api/testimonials` - add a testimonial

Required POST body fields:

- `personName`
- `companyName`
- `review`

## Deployment Notes

- Build the frontend with `npm run build` in [frontend/](frontend)
- Configure the backend environment variables in your hosting provider
- Update the frontend testimonials API base URL if your backend is not using the deployed Render endpoint

## Related Docs

- [frontend/README.md](frontend/README.md)
- [backend/README.md](backend/README.md)

## Contact

- GitHub: [palchhinparihar](https://github.com/palchhinparihar)
