import { collection, getDocs, getDoc, doc, addDoc, query, where } from 'firebase/firestore';
import { db } from './firebase';

const GIFTS_COLLECTION = 'gifts';

// Get all gifts
export const getAllGifts = async () => {
  try {
    const giftsCol = collection(db, GIFTS_COLLECTION);
    const giftSnapshot = await getDocs(giftsCol);
    const giftList = giftSnapshot.docs.map(doc => ({
      id: doc.id,
      _id: doc.id,
      ...doc.data()
    }));
    return giftList;
  } catch (error) {
    console.error('Error fetching gifts:', error);
    throw error;
  }
};

// Get gift by ID
export const getGiftById = async (id) => {
  try {
    const giftDoc = doc(db, GIFTS_COLLECTION, id);
    const giftSnapshot = await getDoc(giftDoc);
    
    if (giftSnapshot.exists()) {
      return {
        id: giftSnapshot.id,
        _id: giftSnapshot.id,
        ...giftSnapshot.data()
      };
    } else {
      throw new Error('Gift not found');
    }
  } catch (error) {
    console.error('Error fetching gift:', error);
    throw error;
  }
};

// Search gifts
export const searchGifts = async (filters) => {
  try {
    let giftsQuery = collection(db, GIFTS_COLLECTION);
    
    // Apply filters
    const constraints = [];
    if (filters.category) {
      constraints.push(where('category', '==', filters.category));
    }
    if (filters.condition) {
      constraints.push(where('condition', '==', filters.condition));
    }
    if (filters.age_years) {
      constraints.push(where('age_years', '==', parseInt(filters.age_years)));
    }
    
    if (constraints.length > 0) {
      giftsQuery = query(giftsQuery, ...constraints);
    }
    
    const giftSnapshot = await getDocs(giftsQuery);
    let giftList = giftSnapshot.docs.map(doc => ({
      id: doc.id,
      _id: doc.id,
      ...doc.data()
    }));
    
    // Client-side filtering for name (Firestore doesn't support LIKE queries)
    if (filters.name) {
      giftList = giftList.filter(gift => 
        gift.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    
    return giftList;
  } catch (error) {
    console.error('Error searching gifts:', error);
    throw error;
  }
};

// Add a new gift
export const addGift = async (giftData) => {
  try {
    const giftsCol = collection(db, GIFTS_COLLECTION);
    const docRef = await addDoc(giftsCol, giftData);
    return {
      id: docRef.id,
      _id: docRef.id,
      ...giftData
    };
  } catch (error) {
    console.error('Error adding gift:', error);
    throw error;
  }
};
