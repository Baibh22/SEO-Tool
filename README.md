# AI Content Optimizer

A full-stack web application that enables content creators to draft, revise, and optimize written content using AI-driven SEO analysis. The system provides real-time keyword suggestions, SEO scoring, and revision tracking to help improve content quality over multiple iterations.

## Features

- **Rich Text Editor**: Draft.js-powered editor for seamless content creation
- **AI-Powered SEO Analysis**: Real-time content analysis using OpenRouter API
- **SEO Scoring**: Get comprehensive SEO scores (0-100) for your content
- **Keyword Suggestions**: AI-generated keyword recommendations
- **Optimization Recommendations**: Actionable insights to improve content
- **Revision Tracking**: Track improvements across multiple content versions
- **Revision History**: View SEO score progression over time

## Tech Stack

### Frontend
- React.js
- Draft.js (Rich text editor)
- Axios (API client)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- OpenRouter API (AI integration)

## Project Structure

```
├── client/                 # React frontend application
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── DraftEditor.js
│   │   │   ├── DraftList.js
│   │   │   └── SEOPanel.js
│   │   ├── services/      # API client
│   │   └── App.js         # Main application
│   └── package.json
│
├── server/                # Express backend application
│   ├── config/           # Database configuration
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   ├── services/         # OpenRouter integration
│   ├── index.js          # Server entry point
│   └── package.json
│
└── README.md
```

## Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- OpenRouter API key

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/Baibh22/SEO-Tool.git
cd SEO-Tool
```

2. **Install dependencies**
```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. **Configure environment variables**

**Backend** (`server/.env`):
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_API_URL=https://openrouter.ai/api/v1/chat/completions
CLIENT_URL=http://localhost:3000
```

**Frontend** (`client/.env`):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. **Run the application**
```bash
# From root directory
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend application on `http://localhost:3000`

## API Endpoints

### Drafts
- `GET /api/drafts` - Get all drafts
- `GET /api/drafts/:id` - Get single draft
- `POST /api/drafts` - Create new draft
- `PUT /api/drafts/:id` - Update draft
- `DELETE /api/drafts/:id` - Delete draft

### SEO Analysis
- `POST /api/seo/analyze/:draftId` - Analyze content and create revision

## Usage

1. **Create a Draft**: Click "New Draft" to start writing
2. **Edit Content**: Use the rich text editor to write your content
3. **Save**: Click "Save" to store your draft
4. **Analyze SEO**: Click "Analyze SEO" to get AI-powered insights
5. **Review Results**: View SEO score, keywords, and recommendations
6. **Track Progress**: Check revision history to see improvements

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
