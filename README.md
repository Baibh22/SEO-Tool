# AI Content Optimizer

Full-stack web application for content creators to draft, revise, and optimize written content using AI-driven SEO analysis.

## Features

- Rich-text editor with Draft.js
- Real-time SEO analysis via OpenRouter API
- Keyword suggestions and optimization recommendations
- Revision tracking with improvement metrics
- SEO score visualization

## Tech Stack

**Frontend:** React, Draft.js
**Backend:** Node.js, Express
**Database:** MongoDB with Mongoose
**AI:** OpenRouter API

## Local Development

1. Install dependencies:
```bash
npm run install-all
```

2. Configure environment variables:

**Backend** (`server/.env`):
```bash
cd server
cp .env.example .env
# Edit with your MongoDB URI and OpenRouter API key
```

**Frontend** (`client/.env`):
```bash
cd client
cp .env.example .env
# Default: REACT_APP_API_URL=http://localhost:5000/api
```

3. Run the application:
```bash
npm run dev
```

Server runs on http://localhost:5000
Client runs on http://localhost:3000

## Deployment on Render

### Option 1: Using render.yaml (Recommended)

1. Push your code to GitHub
2. Go to Render Dashboard → "New" → "Blueprint"
3. Connect your repository
4. Render will detect `render.yaml` and create 2 services:
   - **Backend API** (Web Service)
   - **Frontend** (Static Site)

5. Configure environment variables:

**Backend (content-optimizer-api):**
- `MONGODB_URI` = your MongoDB connection string
- `OPENROUTER_API_KEY` = your OpenRouter API key
- `CLIENT_URL` = your frontend URL (e.g., https://your-app.onrender.com)

**Frontend (content-optimizer-frontend):**
- `REACT_APP_API_URL` = your backend URL (e.g., https://your-api.onrender.com/api)

### Option 2: Manual Setup

**Backend:**
1. New Web Service → Connect repo
2. Root Directory: `server`
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Add environment variables (see above)

**Frontend:**
1. New Static Site → Connect repo
2. Root Directory: `client`
3. Build Command: `npm install && npm run build`
4. Publish Directory: `build`
5. Add `REACT_APP_API_URL` environment variable

## Project Structure

```
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── services/    # API client
│   │   └── App.js       # Main app
│   └── package.json
├── server/              # Express backend
│   ├── config/          # Database config
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── services/        # OpenRouter integration
│   ├── index.js         # Server entry
│   └── package.json
└── render.yaml          # Render deployment config
```

## API Endpoints

- `GET /api/drafts` - Get all drafts
- `POST /api/drafts` - Create new draft
- `PUT /api/drafts/:id` - Update draft
- `DELETE /api/drafts/:id` - Delete draft
- `POST /api/seo/analyze/:draftId` - Analyze SEO and create revision
