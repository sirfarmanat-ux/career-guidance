# EduGuide

EduGuide is a Next.js career guidance platform built to help students discover career paths, explore college options, and get personalized course suggestions based on psychometric data.

## Summary

This project combines a modern React/Next.js App Router frontend with MongoDB-backed APIs and authentication. It includes:

- A landing page with animated hero sections.
- A dashboard area for career quizzes, course suggestions, college search, career paths, and counseling.
- API routes for college data, course suggestions, and phone OTP authentication.
- A MongoDB connection layer and Mongoose models for Colleges, Courses, and Users.

## Technology Stack

- Next.js 16 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Clerk authentication
- MongoDB + Mongoose
- Vercel deployment support
- Lucide icons
- Twilio OTP verification

## Key Features

- **Interactive career quiz** to help students identify strengths and viable streams.
- **Course suggestion engine** grouped by science, commerce, and arts.
- **College directory** with filters and college detail support.
- **Secondary career trajectory navigation** based on quiz results.
- **Counseling section** reachable from the dashboard.
- **OTP-based phone authentication** using Twilio.
- **Video call / Agora provider support** through custom components.

## App Structure

### Main folders

- `app/` – Next.js App Router pages and layouts.
- `app/(dashboard)/` – Dashboard route group with authenticated UI.
- `app/api/` – Server routes for colleges, course suggestions, and auth.
- `components/` – Reusable UI and feature components.
- `hooks/` – Custom React hooks.
- `lib/` – MongoDB connection and Mongoose models.
- `public/` – Static assets (if present).

### Important pages

- `app/page.tsx` — public landing page.
- `app/(dashboard)/layout.tsx` — dashboard shell, sidebar, and header.
- `app/(dashboard)/career-quiz/page.tsx` — psychometric test flow.
- `app/(dashboard)/course-suggestions/page.tsx` — suggested courses.
- `app/(dashboard)/college-directory/page.tsx` — college search and listing.
- `app/(dashboard)/career-paths/page.tsx` — career path exploration.
- `app/(dashboard)/counselling/page.tsx` — counseling landing page.
- `app/(dashboard)/edit-profile/page.tsx` — user profile editor.

## API Routes

- `GET /api/colleges` — returns a list of college documents from MongoDB.
- `GET /api/course-suggestions` — returns courses aggregated by stream.
- `POST /api/auth/send-otp` — sends an SMS OTP via Twilio.
- `POST /api/auth/verify-otp` — verifies the OTP code with Twilio.

## Data Models

Defined in `lib/models/models.ts`:

- `College` — college metadata, location, placement info, and specializations.
- `Course` — course catalog data including stream, degree level, and specializations.
- `User` — application users synced with Clerk and enriched with preferences.

## Database Setup

The project expects a MongoDB connection string in:

- `MONGO_URI`

Example `.env` values:

```env
MONGO_URI=mongodb+srv://username:password@cluster.example.mongodb.net/eduguide
TWILIO_ACCOUNT_SID=AC...your_sid...
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_VERIFY_SERVICE_SID=VA...your_service_sid...
```

## Running Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Deployment

This app is configured for Netlify using `@netlify/plugin-nextjs`.

- `next.config.js` enables server actions and disables image optimization.
- `netlify.toml` defines the Netlify build command and publish directory.

## Important Notes

- The dashboard uses a route group at `app/(dashboard)` and includes its own layout.
- Auth flows are implemented with Clerk and Twilio OTP routes.
- Static JSON assets such as `College_dataset.json`, `colleges.json`, and `psychometric.json` provide source data for the app.
- The application uses custom UI components under `components/ui/` for buttons, inputs, cards, modals, and more.

## Useful Files

- `app/layout.tsx` — base application layout and metadata.
- `app/(dashboard)/layout.tsx` — dashboard layout with navigation and sidebar.
- `lib/mongo.ts` — MongoDB connection helper with caching.
- `lib/models/models.ts` — Mongoose schema definitions.
- `package.json` — dependency and script definitions.
- `postcss.config.js` and `tailwind.config.ts` — styling setup.

## Project Goals

EduGuide is built to support students through every step of their academic planning journey:

1. Diagnose strengths through a psychometric quiz.
2. Recommend relevant streams and courses.
3. Surface colleges matching student interests.
4. Provide career path insights and counselling resources.

---

If you want, I can also add a shorter `CONTRIBUTING.md` or an architecture diagram for this repo.
