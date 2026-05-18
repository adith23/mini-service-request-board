# Mini Service Request Board

A small full-stack service request board for the GlobalTNA technical assessment. Homeowners can post service requests, and tradespeople can browse jobs, view details, update status, and delete requests when authenticated.

## Tech Stack

- Frontend: Next.js App Router, React, Tailwind CSS
- Backend: Node.js, Express, TypeScript
- Database: MongoDB with Mongoose
- Extras: JWT auth, keyword search, API tests, seed script

## Prerequisites

- Node.js 20 or newer
- npm
- MongoDB Atlas connection string or a local MongoDB instance

## Environment Variables

Create the backend environment file:

```powershell
cd backend
copy .env.example .env
```

Required backend variables in `backend/.env`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=<your-mongodb-uri>
CORS_ORIGIN=http://localhost:3000
JWT_SECRET=<long-random-secret>
JWT_EXPIRES_IN=7d
```

`CORS_ORIGIN` supports multiple comma-separated origins, for example:

```env
CORS_ORIGIN=http://localhost:3000,https://your-frontend.vercel.app
```

Create the frontend environment file:

```powershell
cd frontend
copy .env.local.example .env.local
```

Required frontend variable in `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Setup

Install backend dependencies:

```powershell
cd backend
npm install
```

Install frontend dependencies:

```powershell
cd frontend
npm install
```

## Run Locally

Start the backend API:

```powershell
cd backend
npm run dev
```

The backend runs at:

```text
http://localhost:5000
```

Start the frontend app in a second terminal:

```powershell
cd frontend
npm run dev
```

The frontend runs at:

```text
http://localhost:3000
```

Health check:

```text
GET http://localhost:5000/api/health
```

## Seed Sample Jobs

After configuring `backend/.env`, insert sample job requests with:

```powershell
cd backend
npm run seed
```

The seed script clears the existing `jobRequests` collection and inserts 8 sample service requests.

## Available Scripts

Backend:

```powershell
npm run dev      # start Express API with nodemon
npm run build    # compile TypeScript
npm start        # run compiled production server
npm test         # run API tests
npm run seed     # insert sample jobs
```

Frontend:

```powershell
npm run dev      # start Next.js dev server
npm run build    # create production build
npm start        # run production Next.js server
npm run lint     # run ESLint
```

## API Summary

- `GET /api/jobs` - list jobs, with optional `category`, `status`, and `search` query filters
- `GET /api/jobs/:id` - get one job
- `POST /api/jobs` - create a job request
- `PATCH /api/jobs/:id` - update job status
- `DELETE /api/jobs/:id` - delete a job request
- `POST /api/auth/register` - create an account
- `POST /api/auth/login` - log in
- `GET /api/auth/me` - get current user

## Testing

Run backend tests:

```powershell
cd backend
npm test
```

Build frontend:

```powershell
cd frontend
npm run build
```

## Deployment Notes

For production, set:

Backend:

```env
NODE_ENV=production
MONGODB_URI=<production-mongodb-uri>
CORS_ORIGIN=https://<frontend-domain>
JWT_SECRET=<secure-production-secret>
JWT_EXPIRES_IN=7d
```

Frontend:

```env
NEXT_PUBLIC_API_URL=https://<backend-domain>
```
