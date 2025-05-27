import { collection, addDoc, getDocs, query, where, orderBy, deleteDoc, limit, onSnapshot, doc } from "firebase/firestore";
import { auth, db } from "./firebase";  // adjust path if needed

// Required Firestore indexes:
// Collection: texts
// Fields: userId Ascending, createdAt Ascending
// Fields: userId Ascending, createdAt Descending

// Delete oldest items when limit is exceeded
async function deleteOldestItems(userId, currentCount) {
  if (currentCount < 5) return;
  
  try {
    // Get all items for the user
    const q = query(
      collection(db, "texts"),
      where("userId", "==", userId)
    );
    
    const snapshot = await getDocs(q);
    const items = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Sort items by createdAt
    items.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds);
    
    // Delete oldest items
    const itemsToDelete = items.slice(0, currentCount - 4);
    const deletePromises = itemsToDelete.map(item => deleteDoc(doc(db, "texts", item.id)));
    await Promise.all(deletePromises);
  } catch (error) {
    console.error("Error deleting oldest items:", error);
    throw error;
  }
}

// Save text to Firestore
export async function saveText(text) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }
  if (!text.trim()) {
    throw new Error("Text cannot be empty");
  }

  try {
    // Get current count of items
    const countQuery = query(
      collection(db, "texts"),
      where("userId", "==", user.uid)
    );
    const countSnapshot = await getDocs(countQuery);
    const currentCount = countSnapshot.size;

    // Delete oldest items if needed
    await deleteOldestItems(user.uid, currentCount);

    // Add new item
    await addDoc(collection(db, "texts"), {
      content: text,
      userId: user.uid,
      createdAt: new Date()
    });
  } catch (error) {
    console.error("Error saving text:", error);
    throw error;
  }
}

// Get all texts by current user, newest first, with real-time updates
export function getTexts(onUpdate) {
  const user = auth.currentUser;
  if (!user) {
    onUpdate([]);
    return () => {}; // Return empty cleanup function
  }

  const q = query(
    collection(db, "texts"),
    where("userId", "==", user.uid)
  );

  // Set up real-time listener
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const texts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    // Sort texts by createdAt in memory
    texts.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
    onUpdate(texts);
  }, (error) => {
    console.error("Error listening to texts updates:", error);
    onUpdate([]);
  });

  // Return cleanup function
  return unsubscribe;
}
