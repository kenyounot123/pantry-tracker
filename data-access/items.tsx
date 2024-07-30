import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { db } from "@/app/lib/firebase"


interface PantryItem {
  id: string;
  name: string;
  quantity: number;
}

export default async function getItems(): Promise<PantryItem[]> {
  try {
    const q = await getDocs(collection(db, "pantry"));
    const docs: PantryItem[] = q.docs.map(doc => {
      const docData = doc.data() as Partial<PantryItem>; // Use Partial to handle missing fields
      // Ensure all required fields are present, otherwise provide default values
      return {
        id: doc.id, // Firestore document ID
        name: docData.name ?? '', // Provide default value if missing
        quantity: docData.quantity ?? 0, // Provide default value if missing
      };
    });
    return docs;
  } catch (error) {
    console.error("Error fetching data from Firestore:", error);
    return []; // Return an empty array in case of an error
  }
}