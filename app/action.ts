'use server'
import { revalidatePath } from "next/cache";
import { db } from "./lib/firebase"
import { collection, addDoc } from "firebase/firestore"; 
import { doc, deleteDoc } from "firebase/firestore";

export async function createItem(formData: FormData) {
  const name = formData.get('name') as string;
  const quantity = formData.get('quantity') as string;

  try {
    console.log('Item Created:', { name, quantity });
    const docRef = await addDoc(collection(db, "pantry"), {
      name: name,
      quantity: quantity
    })
    console.log("Document written with ID: ", docRef.id);
    revalidatePath("/")
  } catch (error) {
    console.error('Error creating item:', error);
  }
}

export async function deleteItem(id: string) {
  if (id) {
    try {
      // Delete the document with the given ID from the 'pantry' collection
      await deleteDoc(doc(db, "pantry", id));
      revalidatePath("/")
      console.log("Document successfully deleted");
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  } else {
    console.error("No itemId found in FormData");
  }
  
}