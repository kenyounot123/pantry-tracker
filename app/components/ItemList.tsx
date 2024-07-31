import Item from "./Item"
import { getFilteredItems } from "@/data-access/items"

export default async function ItemList({query}: {query: string}) {
  const items = await getFilteredItems(query)
  return (
    <>
      {items && items.map((item) => (
        <Item key={item.id} pantryItem={item}/>
      ))}
    </>
  )
}