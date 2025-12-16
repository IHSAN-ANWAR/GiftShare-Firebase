import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB3ecvZn5jra4x-ryCMGaATRgPEzbiB-ug",
  authDomain: "giftshare-89ace.firebaseapp.com",
  projectId: "giftshare-89ace",
  storageBucket: "giftshare-89ace.firebasestorage.app",
  messagingSenderId: "324017299838",
  appId: "1:324017299838:web:da89d33aa95eb0890a932f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const sampleGifts = [
  {
    name: "Vintage Camera",
    category: "Electronics",
    condition: "Good",
    age_years: 10,
    description: "A classic vintage camera in good working condition. Perfect for photography enthusiasts.",
    image: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=400"
  },
  {
    name: "Children's Book Collection",
    category: "Books",
    condition: "Like New",
    age_years: 2,
    description: "Set of 10 children's books, gently used and perfect for ages 5-8.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400"
  },
  {
    name: "Kitchen Mixer",
    category: "Appliances",
    condition: "New",
    age_years: 0,
    description: "Brand new kitchen mixer, never used. Still in original packaging.",
    image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400"
  },
  {
    name: "Board Games Set",
    category: "Toys",
    condition: "Good",
    age_years: 3,
    description: "Collection of 5 classic board games. Some wear on boxes but all pieces included.",
    image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=400"
  },
  {
    name: "Yoga Mat",
    category: "Sports",
    condition: "Like New",
    age_years: 1,
    description: "Barely used yoga mat with carrying strap. Non-slip surface.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400"
  }
];

async function importGifts() {
  try {
    console.log('Starting import...');
    const giftsCol = collection(db, 'gifts');
    
    for (const gift of sampleGifts) {
      const docRef = await addDoc(giftsCol, gift);
      console.log(`✅ Added: ${gift.name} (ID: ${docRef.id})`);
    }
    
    console.log('\n🎉 All gifts imported successfully!');
    console.log('Refresh your app to see the gifts.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error importing gifts:', error);
    process.exit(1);
  }
}

importGifts();
