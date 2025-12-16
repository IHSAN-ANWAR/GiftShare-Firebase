# Gift Link - Capstone Project Checklist

## Project Requirements (40 Points - 18 Tasks)

### ✅ Task 1: GitHub Repository with Issue Template (2 points)
- [x] Create `.github/ISSUE_TEMPLATE/user-story.md` file
- [ ] Repository URL: `https://github.com/YOUR_USERNAME/gift-link`

### ✅ Task 2: User Stories (4 points)
Create at least 8 user stories with appropriate labels:
- [ ] User Story 1 - Label: `new` or `backlog`
- [ ] User Story 2 - Label: `new` or `backlog`
- [ ] User Story 3 - Label: `new` or `backlog`
- [ ] User Story 4 - Label: `new` or `backlog`
- [ ] User Story 5 - Label: `icebox`
- [ ] User Story 6 - Label: `icebox`
- [ ] User Story 7 - Label: `technical debt`
- [ ] User Story 8 - Label: `backlog`

### ✅ Task 3: MongoDB Import Screenshot (2 points)
- [ ] Import 16 documents using: `mongoimport --db giftlink --collection gifts --file sample-gifts.json --jsonArray`
- [ ] Take screenshot showing 16 documents imported

### ✅ Task 4: MongoDB Connection in db.js (2 points)
- [x] File: `giftlink-backend/models/db.js`
- [x] Contains: `await client.connect()`

### ✅ Task 5: Database Connection in giftRoutes.js (2 points)
- [x] File: `giftlink-backend/routes/giftRoutes.js`
- [x] Contains: `connectToDatabase()` method call

### ✅ Task 6: Gift Routes (2 points)
- [x] File: `giftlink-backend/routes/giftRoutes.js`
- [x] Route: `/` serves `/api/gifts`
- [x] Route: `/:id` serves `/api/gifts/:id`

### ✅ Task 7: Search Route with Category Filter (2 points)
- [x] File: `giftlink-backend/routes/searchRoutes.js`
- [x] Contains: Code to filter on category

### ✅ Task 8: Search Route in app.js (2 points)
- [x] File: `giftlink-backend/app.js`
- [x] Route: `/api/gifts/search`

### ✅ Task 9: Sentiment Analysis (2 points)
- [x] File: `giftlink-backend/sentiment/index.js`
- [x] Contains: `const natural = require('natural')`

### ✅ Task 10: RegisterPage Fetch Request (2 points)
- [x] File: `giftlink-frontend/src/components/RegisterPage/RegisterPage.js`
- [x] Contains: `method` and `headers` attributes in fetch request

### ✅ Task 11: LoginPage Headers (2 points)
- [x] File: `giftlink-frontend/src/components/LoginPage/LoginPage.js`
- [x] Contains: `Content-Type` and `Authorization` in headers object

### ✅ Task 12: Auth Routes findOne (2 points)
- [x] File: `giftlink-backend/routes/authRoutes.js`
- [x] Contains: `collection.findOne()` method to find user

### Screenshots Required for Submission:

### ⏳ Task 13: Landing Page Screenshot (2 points)
- [ ] Screenshot of landing page
- [ ] Must include deployment URL in screenshot

### ⏳ Task 14: MainPage Before Login Screenshot (2 points)
- [ ] Screenshot showing all gifts listed
- [ ] Must include deployment URL in screenshot

### ⏳ Task 15: Register Page Screenshot (2 points)
- [ ] Screenshot showing user registration form filled out
- [ ] Show user details about to be registered

### ⏳ Task 16: Logged-in User Screenshot (2 points)
- [ ] Screenshot showing username in navbar
- [ ] Must include deployment URL in screenshot

### ⏳ Task 17: Gift Details Page Screenshot (2 points)
- [ ] Screenshot of gift details page
- [ ] Must include deployment URL in screenshot

### ⏳ Task 18: Search Results Screenshot (2 points)
- [ ] Screenshot of search results matching criteria
- [ ] Must include deployment URL in screenshot

### ⏳ Task 19: CI/CD Pipeline Screenshot (2 points)
- [ ] Screenshot of successful CI/CD run
- [ ] GitHub Actions workflow completion

## Deployment Steps

### Backend Deployment (Firebase Functions)
```bash
cd giftlink-backend
npm install -g firebase-tools
firebase login
firebase init functions
firebase deploy --only functions
```

### Frontend Deployment (Firebase Hosting)
```bash
cd giftlink-frontend
firebase init hosting
npm run build
firebase deploy --only hosting
```

### GitHub Secrets to Add
1. `FIREBASE_TOKEN` - Get via `firebase login:ci`
2. `VITE_API_URL` - Your deployed backend URL

## Sample User Stories to Create

1. **User Registration** (Label: new)
   - As a new user, I want to register an account, so that I can share and receive gifts.

2. **User Login** (Label: new)
   - As a registered user, I want to log in, so that I can access my personalized features.

3. **Browse Gifts** (Label: new)
   - As a user, I want to browse all available gifts, so that I can find something I need.

4. **Search Gifts** (Label: new)
   - As a user, I want to search gifts by category, so that I can quickly find relevant items.

5. **View Gift Details** (Label: backlog)
   - As a user, I want to view detailed information about a gift, so that I can make an informed decision.

6. **Add New Gift** (Label: icebox)
   - As a logged-in user, I want to add a new gift, so that I can share with the community.

7. **Sentiment Analysis** (Label: technical debt)
   - As a developer, I want to implement sentiment analysis on reviews, so that users can see gift ratings.

8. **Responsive Design** (Label: backlog)
   - As a mobile user, I want the app to work on my phone, so that I can browse gifts anywhere.

## Notes
- Make sure MongoDB is running locally before testing
- Update `.env` files with your actual configuration
- Test all routes using Postman or similar tool before deployment
- Take high-quality screenshots with clear URL visibility
- Ensure CI/CD pipeline runs successfully before submission
