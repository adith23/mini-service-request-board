# Mini Service Request Board

Full-stack assessment app with a Next.js frontend, Express backend, MongoDB Atlas, Mongoose, Tailwind CSS, keyword search, and JWT auth.

## Local Setup

Backend:

```powershell
cd backend
npm install
copy .env.example .env
npm run dev
```

Frontend:

```powershell
cd frontend
npm install
copy .env.local.example .env.local
npm run dev
```

Local URLs:

- Frontend: `http://localhost:3000`
- Backend health: `http://localhost:5000/api/health`

## Environment Variables

Backend `backend/.env`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=<your-mongodb-atlas-uri>
CORS_ORIGIN=http://localhost:3000
JWT_SECRET=<long-random-secret>
JWT_EXPIRES_IN=7d
```

Frontend `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Deploy Backend to Railway

1. Push the full repository to GitHub.
2. In Railway, create a new project from the GitHub repository.
3. Add a backend service and set the service root directory to:
   ```text
   /backend
   ```
4. Set Railway commands:
   ```text
   Build Command: npm install && npm run build
   Start Command: npm start
   ```
5. Add Railway environment variables:
   ```env
   NODE_ENV=production
   MONGODB_URI=<your-mongodb-atlas-uri>
   JWT_SECRET=<long-random-secret>
   JWT_EXPIRES_IN=7d
   CORS_ORIGIN=https://<temporary-or-final-vercel-url>
   ```
6. Deploy the Railway service.
7. Generate/copy the public Railway domain.
8. Test:
   ```text
   GET https://<railway-backend-url>/api/health
   ```

Expected response includes:

```json
{ "status": "ok" }
```

## Deploy Frontend to Vercel

1. In Vercel, import the same GitHub repository.
2. Configure the project:
   ```text
   Framework Preset: Next.js
   Root Directory: frontend
   Install Command: npm install
   Build Command: npm run build
   Output Directory: default
   ```
3. Add Vercel environment variable:
   ```env
   NEXT_PUBLIC_API_URL=https://<railway-backend-url>
   ```
4. Deploy the Vercel project.
5. Copy the Vercel production domain.
6. Return to Railway and update:
   ```env
   CORS_ORIGIN=https://<vercel-frontend-url>
   ```
7. Redeploy the Railway backend.

## Production Acceptance Checks

- Vercel home page loads jobs from Railway.
- Register/login works from `/login`.
- Logged-in users can create and delete jobs.
- Logged-out users cannot create or delete jobs.
- Category filter and keyword search work.
- Browser console has no CORS errors and no calls to `localhost`.

Share these final URLs:

- Frontend: `https://<vercel-frontend-url>`
- Backend: `https://<railway-backend-url>`
