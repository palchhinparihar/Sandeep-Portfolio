# Backend API

Express + MongoDB backend for the portfolio site. It exposes a simple testimonials API and enables CORS for the frontend.

## Setup

Create a `.env` file with `DB_URI` pointing to your MongoDB connection string, then start the server from the backend folder.

Set `ADMIN_TOKEN` in `.env` to protect testimonial updates and deletes. Send it as `Authorization: Bearer <ADMIN_TOKEN>` when calling those endpoints.

## API

- `GET /` - health message
- `GET /api/testimonials` - fetch all testimonials
- `POST /api/testimonials` - add a testimonial with `personName`, `companyName`, and `review`
- `PATCH /api/testimonials/:id` - update a testimonial; requires the admin token
- `DELETE /api/testimonials/:id` - delete a testimonial; requires the admin token

## Notes

- The server runs on port `3000`.
- Testimonial text is normalized by capitalizing the first letter before saving.