# Sandeep Singh Portfolio

Personal portfolio website for Sandeep Singh. The site is a responsive React single-page application with animated sections, a Supabase-backed content layer, and a protected admin dashboard for managing portfolio data.

## Features

- Public portfolio sections for:
  - Home and introduction
  - About
  - Professional experience
  - Certificates
  - Testimonials
  - Clients
  - Gallery
  - Technical skills
  - Contact and social links
- Responsive dark-themed UI with Tailwind CSS
- Motion and scroll animations using Framer Motion and AOS
- Supabase integration for:
  - Email/password admin authentication
  - Experiences
  - Clients
  - Testimonials
- Admin dashboard for adding, editing, and deleting experiences and clients, and managing testimonials
- Downloadable CV in [`public/Sandeep Singh (Interpretation) CV.docx`](public/Sandeep%20Singh%20%28Interpretation%29%20CV.docx)

## Tech Stack

- React 19
- Vite 6
- Tailwind CSS 4
- React Router
- Supabase JavaScript client
- Framer Motion
- AOS
- React Icons
- React Toastify
- OGL

## Project Structure

```text
.
├── public/                 # Static files, including the logo and CV
├── src/
│   ├── api/                # Supabase-backed API helpers
│   ├── components/
│   │   ├── admin/          # Login and protected content management UI
│   │   ├── common/         # Shared navigation, footer, and notifications
│   │   ├── layout/         # Animated visual layout components
│   │   └── main/           # Public portfolio sections
│   ├── data/               # Static portfolio data such as skills and gallery items
│   └── lib/                # Supabase client configuration
├── index.html
├── package.json
└── vite.config.js
```

## Prerequisites

- Node.js 18 or newer
- npm
- A Supabase project

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root:

   ```dotenv
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
   VITE_ADMIN_EMAIL_1=first_admin@example.com
   VITE_ADMIN_EMAIL_2=second_admin@example.com
   ```

   `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` are required by [`src/lib/supabase.js`](src/lib/supabase.js). The admin email variables identify the accounts intended to manage portfolio content.

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the local URL printed by Vite, usually <http://localhost:5173>.

## Supabase Setup

The application expects Supabase Auth to be configured for email/password sign-in and uses these tables:

- `experiences` - professional roles and milestones, including title, dates, description, points, and sort order
- `clients` - client names displayed in the public clients section
- `testimonials` - submitted testimonials with a person name, company name, review, and creation timestamp

Create the admin users in Supabase Authentication before using the dashboard. Configure Row Level Security policies appropriate for your deployment; the browser uses the publishable key, so database access must be enforced by Supabase policies rather than by frontend code.

## Routes

### Public

- `/` - public portfolio page
- Any unmatched public path renders the portfolio page

### Admin

- `/login` - admin sign-in
- `/admin` - admin dashboard
- `/admin/experiences` - manage experiences
- `/admin/testimonials` - manage testimonials
- `/admin/clients` - manage clients

Admin routes require an authenticated Supabase user.

## Available Scripts

Run these commands from the repository root:

```bash
npm run dev      # Start the Vite development server
npm run build    # Create a production build in dist/
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
```

## Production Deployment

1. Build the application:

   ```bash
   npm run build
   ```

2. Deploy the generated `dist/` directory to a static hosting provider such as Netlify or Vercel.

3. Add the same `VITE_*` environment variables in the hosting provider’s project settings and rebuild after changing them.

4. Configure the host to serve `index.html` for client-side routes so `/login` and `/admin/*` work when loaded directly.

## Contact

- GitHub: [palchhinparihar](https://github.com/palchhinparihar)