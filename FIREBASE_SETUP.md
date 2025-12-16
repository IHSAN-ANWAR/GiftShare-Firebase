# Firebase Setup Guide for Gift Link

This guide will help you set up Firebase for your Gift Link application.

## 🔥 Firebase Project Setup

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: `gift-link` (or your preferred name)
4. Disable Google Analytics (optional for this project)
5. Click "Create project"

### Step 2: Register Your Web App

1. In your Firebase project, click the web icon (</>) to add a web app
2. Register app with nickname: "Gift Link Frontend"
3. ✅ Check "Also set up Firebase Hosting"
4. Click "Register app"
5. **Copy the Firebase configuration** - you'll need these values!

```javascript
// Your Firebase configuration will look like this:
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### Step 3: Enable Firebase Services

#### Enable Firestore Database
1. In Firebase Console, go to **Build → Firestore Database**
2. Click "Create database"
3. Select "Start in **test mode**" (for development)
4. Choose your location (closest to your users)
5. Click "Enable"

#### Enable Authentication
1. Go to **Build → Authentication**
2. Click "Get started"
3. Click on "Email/Password" under Sign-in method
4. Enable "Email/Password"
5. Click "Save"

### Step 4: Configure Your Frontend

1. Create a `.env` file in `giftlink-frontend/`:

```bash
cd giftlink-frontend
cp .env.example .env
```

2. Edit `.env` and add your Firebase config values:

```env
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

### Step 5: Install Dependencies

```bash
cd giftlink-frontend
npm install
```

This will install:
- `firebase` - Firebase JavaScript SDK
- All React dependencies
- Vite build tool

### Step 6: Add Sample Gift Data to Firestore

You can add sample gifts using Firebase Console:

1. Go to **Firestore Database** in Firebase Console
2. Click "Start collection"
3. Collection ID: `gifts`
4. Add documents with these fields:
   - `name` (string)
   - `category` (string)
   - `condition` (string)
   - `age_years` (number)
   - `description` (string)
   - `image` (string - URL)

**Or use this script to import via code:**

Create a file `importGifts.js` in your frontend:

```javascript
import { collection, addDoc } from 'firebase/firestore';
import { db } from './src/services/firebase';
import gifts from '../sample-gifts.json';

async function importGifts() {
  const giftsCol = collection(db, 'gifts');
  
  for (const gift of gifts) {
    await addDoc(giftsCol, gift);
    console.log(`Added: ${gift.name}`);
  }
  
  console.log('All gifts imported!');
}

importGifts();
```

## 🚀 Deployment

### Deploy Frontend to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy from frontend directory:
```bash
cd giftlink-frontend
vercel
```

4. Add environment variables in Vercel dashboard:
   - Go to your project → Settings → Environment Variables
   - Add all `VITE_FIREBASE_*` variables

5. Deploy to production:
```bash
vercel --prod
```

### Firestore Security Rules (Production)

Before going to production, update your Firestore rules:

1. Go to **Firestore Database → Rules**
2. Replace with these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can only read/write their own data
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Gifts collection - anyone can read, authenticated users can write
    match /gifts/{giftId} {
      allow read: if true;  // Anyone can browse gifts
      allow create: if request.auth != null;  // Only authenticated users can add gifts
      allow update, delete: if request.auth != null;
    }
  }
}
```

## 🔐 Firebase Authentication Flow

The app uses Firebase Authentication for:
- **User Registration**: Creates user in Firebase Auth + stores profile in Firestore
- **User Login**: Signs in with Firebase Auth
- **Session Management**: Automatic with Firebase SDK
- **Logout**: Signs out from Firebase

## 📊 Firestore Database Structure

```
/users/{userId}
  - email: string
  - username: string
  - firstName: string
  - lastName: string
  - createdAt: timestamp

/gifts/{giftId}
  - name: string
  - category: string
  - condition: string
  - age_years: number
  - description: string
  - image: string (URL)
```

## ✅ Testing Your Setup

1. Start the development server:
```bash
npm run dev
```

2. Open `http://localhost:3000`

3. Test the features:
   - ✅ Register a new account
   - ✅ Login with credentials
   - ✅ Browse gifts
   - ✅ Search gifts by category
   - ✅ View gift details
   - ✅ Logout

## 🆘 Troubleshooting

### "Firebase: Error (auth/operation-not-allowed)"
- Make sure Email/Password authentication is enabled in Firebase Console

### "Missing or insufficient permissions"
- Check your Firestore security rules
- Make sure you're in test mode or have proper rules configured

### "Firebase: No Firebase App '[DEFAULT]' has been created"
- Check that your `.env` file has all Firebase config values
- Restart your dev server after adding `.env`

### Build errors with Vite
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check that all environment variables start with `VITE_`

## 📝 Important Notes

1. **No Backend Server Needed!** Firebase handles everything:
   - Database (Firestore)
   - Authentication (Firebase Auth)
   - Hosting (Firebase Hosting or Vercel)

2. **Development vs Production:**
   - Development: Use test mode Firestore rules
   - Production: Use secure Firestore rules

3. **Cost:** Firebase free tier includes:
   - 50K reads/day
   - 20K writes/day
   - 1GB storage
   - Perfect for this project!

## 🎯 Summary

Your Gift Link app now uses:
- ✅ **Frontend**: React + Vite (deployed on Vercel)
- ✅ **Database**: Cloud Firestore (Firebase)
- ✅ **Authentication**: Firebase Auth
- ✅ **Hosting**: Vercel (auto-deploys from Git)

No complex backend setup needed! 🎉
