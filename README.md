# Gift Link Capstone Project

A full-stack gift-sharing application built with React (Vite), Node.js/Express, and MongoDB.

## Project Structure

```
gift-link/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   └── user-story.md
│   └── workflows/
│       ├── backend-ci-cd.yml
│       └── frontend-ci-cd.yml
├── giftlink-backend/
│   ├── models/
│   │   └── db.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── giftRoutes.js
│   │   └── searchRoutes.js
│   ├── sentiment/
│   │   └── index.js
│   ├── app.js
│   ├── package.json
│   ├── firebase.json
│   └── .env.example
└── giftlink-frontend/
    ├── src/
    │   ├── components/
    │   │   ├── LandingPage/
    │   │   ├── MainPage/
    │   │   ├── RegisterPage/
    │   │   ├── LoginPage/
    │   │   ├── DetailsPage/
    │   │   ├── SearchPage/
    │   │   └── Navbar/
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── package.json
    ├── vite.config.js
    ├── firebase.json
    └── .env.example
```

## Features

- User authentication (registration and login)
- Browse all gifts
- Search gifts by category, name, condition, and age
- View detailed gift information
- Responsive design with Bootstrap
- Sentiment analysis for reviews (using natural npm package)
- CI/CD pipeline with GitHub Actions
- Firebase deployment ready

## Prerequisites

- Node.js 18.x or higher
- MongoDB (local or cloud instance)
- Firebase account (for deployment)
- Git

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd giftlink-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your MongoDB connection string and JWT secret:
   ```
   MONGO_URL=mongodb://localhost:27017
   MONGO_DB_NAME=giftlink
   JWT_SECRET=your-secret-key-here
   PORT=5000
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd giftlink-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your backend API URL:
   ```
   VITE_API_URL=http://localhost:5000
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:3000`

## MongoDB Setup

### Import Sample Data

To import 16 sample gift documents into MongoDB:

1. Create a file named `sample-gifts.json` with sample data
2. Use MongoDB import command:
   ```bash
   mongoimport --db giftlink --collection gifts --file sample-gifts.json --jsonArray
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Gifts
- `GET /api/gifts` - Get all gifts
- `GET /api/gifts/:id` - Get gift by ID
- `POST /api/gifts` - Create a new gift

### Search
- `GET /api/gifts/search?category=&name=&condition=&age_years=` - Search gifts

## Deployment

### Firebase Deployment

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase in each directory:
   ```bash
   cd giftlink-backend
   firebase init functions
   
   cd ../giftlink-frontend
   firebase init hosting
   ```

4. Deploy:
   ```bash
   # Backend
   cd giftlink-backend
   firebase deploy --only functions
   
   # Frontend
   cd giftlink-frontend
   firebase deploy --only hosting
   ```

### GitHub Actions CI/CD

The project includes GitHub Actions workflows for automated testing and deployment:

1. Add secrets to your GitHub repository:
   - `FIREBASE_TOKEN` - Get this by running `firebase login:ci`
   - `VITE_API_URL` - Your production API URL

2. Push to main/master branch to trigger deployment

## User Stories

Create at least 8 user stories using the template in `.github/ISSUE_TEMPLATE/user-story.md`. Label them with:
- `new` - New features
- `icebox` - Future ideas
- `technical debt` - Code improvements
- `backlog` - Planned work

## Screenshots Required for Submission

1. MongoDB import showing 16 documents
2. Landing page with deployment URL
3. MainPage (browse gifts) before login with deployment URL
4. Register page with user details
5. Logged-in user with username in navbar and deployment URL
6. Gift details page with deployment URL
7. Search results page with deployment URL
8. Successful CI/CD pipeline run

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB with native driver
- bcryptjs for password hashing
- jsonwebtoken for authentication
- natural for sentiment analysis
- Firebase Functions for deployment

### Frontend
- React 18
- Vite
- React Router DOM
- Bootstrap 5
- React Bootstrap
- Firebase Hosting for deployment

## License

MIT

## Author

Your Name
