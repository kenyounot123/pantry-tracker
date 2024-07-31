'use server'
import { revalidatePath } from "next/cache";
import { db } from "./lib/firebase"
import { collection, addDoc } from "firebase/firestore"; 
import { doc, deleteDoc } from "firebase/firestore";

export type FormState = {
  name: string,
  quantity: string,
  errors: {
    name: string | undefined,
    quantity: string | undefined
  }
}

export async function createItem(previousState: FormState, formData: FormData) {
  const name = formData.get('name') as string;
  const quantity = parseInt(formData.get('quantity') as string);

  if (!name) {
    return {
      name,
      errors: {
        name: "name must be defined"
      }
    }
  }
  
  if (!quantity) {
    return {
      quantity,
      errors: {
        quantity: "quantity must be defined"
      }
    }
  }


  try {
    await addDoc(collection(db, "pantry"), {
      name: name,
      quantity: quantity
    })
    revalidatePath("/")
  } catch (error) {
    console.error('Error creating item:', error);
  }

  return {
    name: "",
    quantity: "",
    errors: {
      name: undefined,
      quantity: undefined
    }
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