import { item } from '../App';
import { useState } from 'react';

// Editor page for adding, editing or removing items from the warehouse.
export default function Editor({ addItemFunc, displayItems, removeItemById, changeItem }: { addItemFunc: (item: item) => void, displayItems: item[], removeItemById: (id:string) => void, changeItem:(id:string, changeitem:item) => void}) {
  // Changeable fields
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  // Add item button functionality
  const handleAddItem = (e: React.FormEvent) => {
    // Stop the page from reloading
    e.preventDefault();
    // Create a new class of item with the inputed information
    const newItem: item = {
      name: itemName,
      price: itemPrice,
      // Generate an ID at random with a wide range to avoid duplicates
      id: (Math.random() * 999999999).toString(),
      count: itemCount
    };
    // Add the new item to the list of items
    addItemFunc(newItem);
    // Reset the input fields for future use
    setItemName('');
    setItemPrice(0);
    setItemCount(0);
  };
  // Change item based on stat
  const changeItemFunc = (itemId:string, statName:string) => {
    // Find the item that the user wants to changed
    const originalItem = displayItems.find((x => x.id === itemId));
    // If the Original Item exists
    if (originalItem) {
      // Prompt user to choose new item stat value
      const newItemStatValue = prompt("New Value:");
      // if it's not null
      if (newItemStatValue) {
        // Create a new one with identical stats
        var copyOfTheOriginal: item = {
          id: (Math.random() * 999999).toString(),
          name: statName === "name" ? newItemStatValue : originalItem.name,
          price: statName === "price" ? Number(newItemStatValue) : originalItem.price,
          count: statName === "count" ? Number(newItemStatValue) : originalItem.count
        }
        // Switch the items
        changeItem(itemId, copyOfTheOriginal);
      }
    }
  };

  return (
    <div>
      <h1>Editor</h1>
      <p>Welcome to the editor page!</p>
      <form onSubmit={handleAddItem}>
        <label htmlFor="itemName">Item Name:</label>
        <input
          type="text"
          name="itemName"
          id = "itemName"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
        />
        <label htmlFor="itemPrice">Item Price:</label>
        <input
          type="text"
          name="itemPrice"
          value={`${itemPrice}€`}
          onChange={(e) => setItemPrice(Number(e.target.value.replace('€', '')))}
          required
        />
        <label htmlFor="itemCount">Item Count:</label>
        <input
          type="number"
          name="itemCount"
          value={itemCount}
          onChange={(e) => setItemCount(Number(e.target.value))}
          required
        />
        <button type="submit">Add Item</button>
      </form>
      <div>
        {displayItems.map((item) => {
          return(
            <div key={Math.random() * 999999}>
              <h1 onClick={(e) => changeItemFunc(item.id, "name")}>{item.name}</h1>
              <h2 onClick={(e) => changeItemFunc(item.id, "price")}>{item.price}€</h2>
              <h3 onClick={(e) => changeItemFunc(item.id, "count")}>In Stock: {item.count}</h3>
              <button onClick={(e) => removeItemById(item.id)}>Remove Item</button>
            </div>
          )
        })}
      </div>
    </div>
  );
}