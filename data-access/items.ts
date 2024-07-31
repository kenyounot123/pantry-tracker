import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { db } from "@/app/lib/firebase"


interface PantryItem {
  id: string;
  name: string;
  quantity: number;
}
export async function getFilteredItems(query:string): Promise<PantryItem[]> {
  try {
    const q = await getDocs(collection(db, "pantry"));
    const docs: PantryItem[] = q.docs.map(doc => {
      const docData = doc.data() as Partial<PantryItem>; 
      return {
        id: doc.id, 
        name: docData.name ?? '', 
        quantity: docData.quantity ?? 0, 
      };
    });
    const filteredItems = docs.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    return filteredItems
    
  } catch (error) {
    console.error("Error fetching data from Firestore:", error);
    return []; // Return an empty array in case of an error
  }
}