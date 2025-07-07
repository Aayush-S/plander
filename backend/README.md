# Plander Backend

This is the backend service for Plander, built with FastAPI and designed to work with Vercel and Neon PostgreSQL.

## Setup

1. Install dependencies:

```bash
pip install -r requirements.txt
```

2. Set up environment variables:

- Create a `.env` file in the backend directory
- Add your Neon database URL:

```
DATABASE_URL=your_neon_database_url
```

3. Local development:

```bash
uvicorn api.index:app --reload
```

## Deployment

The backend is configured to deploy on Vercel. Make sure to:

1. Add your Neon database URL to your Vercel project's environment variables
2. Connect your repository to Vercel
3. Deploy!
