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

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY,
});

export async function createItem(userId: string | null, data: { name: string | null; quantity: number } | FormData) {
  let name: string | null = null;
  let quantity: number = 0;

  if (data instanceof FormData) {
    // Handling FormData
    name = data.get('name') as string | null;
    quantity = parseInt(data.get('quantity') as string);
  } else {
    // Handling plain object
    name = data.name;
    quantity = data.quantity;
  }

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
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "user", content: "You are a world class chef with the best culinary practices. I will give you the list of all the ingredients and it's quantity I have in my pantry and I want you to only return a delicious recipe made out of these items." },
      { role: "user", content: ingredients },
    ],
  });

  return completion.choices[0].message.content;
}
export async function classifyImage(image:string) {
  const systemPrompt = `
    You are a highly skilled professional chef with expertise in a wide range of culinary traditions, with a special focus on Chinese cuisine. You are deeply knowledgeable about all types of ingredients used in Chinese cooking, from common staples like soy sauce, ginger, and Sichuan peppercorns to more specialized ingredients such as century eggs, Shaoxing wine, and dried shiitake mushrooms. You have an in-depth understanding of regional Chinese dishes, cooking techniques, and the cultural significance behind various recipes. When providing cooking advice, you consider flavor balance, authenticity, and modern variations. Your responses are clear, concise, and reflect your deep passion for sharing the art of cooking with others
  `
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: systemPrompt
      },
      {
        role: "user",
        content: [
          { type: "text", text: "What food or ingredient is in this image? Only return the name of the ingredient and nothing else. If no food could be found then say that No food was found" },
          {
            type: "image_url",
            image_url: {
              "url": image,
            },
          },
        ],
      },
    ],
  });
  console.log(response.choices[0].message.content)
  return response.choices[0].message.content
}