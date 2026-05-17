# Backend API

Express + MongoDB backend for the portfolio site. It exposes a simple testimonials API and enables CORS for the frontend.

## Setup

Create a `.env` file with `DB_URI` pointing to your MongoDB connection string, then start the server from the backend folder.

## API

- `GET /` - health message
- `GET /api/testimonials` - fetch all testimonials
- `POST /api/testimonials` - add a testimonial with `personName`, `companyName`, and `review`

## Notes

- The server runs on port `3000`.
- Testimonial text is normalized by capitalizing the first letter before saving.