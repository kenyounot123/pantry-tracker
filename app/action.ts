'use server'
import { revalidatePath } from "next/cache";
import { db } from "./lib/firebase"
import { collection, addDoc } from "firebase/firestore"; 
import { doc, deleteDoc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";

export async function createItem(userId: string | null, formData: FormData) {
  const name = formData.get('name') as string;
  const quantity = parseInt(formData.get('quantity') as string);

  try {
    const doc = await addDoc(collection(db, `users/${userId}/pantry`), {
      name: name,
      quantity: quantity
    })
    revalidatePath("/home")
    return doc.id
  } catch (error) {
    console.error('Error creating item:', error);
  }

}

export async function updateItem(userId:string | null, id: string, formData: FormData) {
  const name = formData.get('name') as string;
  const quantity = parseInt(formData.get('quantity') as string);
  try {
    const itemRef = doc(db, `users/${userId}/pantry`, id);
    await updateDoc(itemRef, {
      name: name,
      quantity: quantity
    });
    revalidatePath("/home");
  } catch (error) {
    console.error('Error updating item:', error);
  }
}

export async function deleteItem(userId:string | null, id: string) {
  if (id) {
    try {
      // Delete the document with the given ID from the 'pantry' collection
      await deleteDoc(doc(db, `users/${userId}/pantry`, id));
      revalidatePath("/home")

    } catch (error) {
      console.error("Error deleting document:", error);
    }
  } else {
    console.error("No itemId found in FormData");
  }
  
}