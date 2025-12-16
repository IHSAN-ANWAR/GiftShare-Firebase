import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

// Register a new user
export const registerUser = async (userData) => {
  try {
    const { email, password, username, firstName, lastName } = userData;
    
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update profile with display name
    await updateProfile(user, {
      displayName: username
    });
    
    // Store additional user data in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email,
      username,
      firstName,
      lastName,
      createdAt: new Date().toISOString()
    });
    
    return {
      id: user.uid,
      email: user.email,
      username,
      firstName,
      lastName
    };
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Login user
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    const userData = userDoc.data();
    
    return {
      id: user.uid,
      email: user.email,
      username: userData?.username || user.displayName,
      firstName: userData?.firstName,
      lastName: userData?.lastName
    };
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser;
};
