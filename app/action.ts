'use server'
import { revalidatePath } from "next/cache";
import { db } from "./lib/firebase"
import { collection, addDoc } from "firebase/firestore"; 
import { doc, deleteDoc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
import OpenAI from "openai";

interface PantryItem {
  id: string;
  name: string;
  quantity: number;
}

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
export async function suggestRecipe(items: PantryItem[]) {
  const ingredients = items.map((item) => item.name).join(", ")
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY,
  });
  const completion = await openai.chat.completions.create({
    model: "meta-llama/llama-3.1-8b-instruct:free",
    messages: [
      { role: "user", content: "You are a world class chef with the best culinary practices. I will give you the list of all the ingredients and it's quantity I have in my pantry and I want you to only return a delicious recipe made out of these items." },
      { role: "user", content: ingredients },
    ],
  });

  return completion.choices[0].message.content;
}