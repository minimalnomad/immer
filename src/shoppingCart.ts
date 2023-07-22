import { produce } from "immer";

// Sample initial cart state
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialCart: CartState = {
  items: [],
};

// Helper function to update the cart state using Immer
const updateCart = <T extends CartState>(
  draft: T,
  updater: (draft: T) => void
): T => produce(draft, updater);

// Add an item to the cart
const addItemToCart = (cart: CartState, item: CartItem): CartState => {
  return updateCart(cart, (draft) => {
    draft.items.push(item);
  });
};

// Remove an item from the cart
const removeItemFromCart = (cart: CartState, itemId: number): CartState => {
  return updateCart(cart, (draft) => {
    draft.items = draft.items.filter((item) => item.id !== itemId);
  });
};

// Update the quantity of an item in the cart
const updateItemQuantity = (
  cart: CartState,
  itemId: number,
  quantity: number
): CartState => {
  return updateCart(cart, (draft) => {
    const itemIndex = draft.items.findIndex((item) => item.id === itemId);
    if (itemIndex !== -1) {
      draft.items[itemIndex].quantity = quantity;
    }
  });
};

// Function to display the cart
const displayCart = (cart: CartState): void => {
  console.log("--- Shopping Cart ---");
  cart.items.forEach((item) => {
    console.log(
      `${item.name} (Quantity: ${item.quantity}) - $${
        item.price * item.quantity
      }`
    );
  });
  console.log("--------------------");
};

// Function to display available items
const displayItems = (): void => {
  console.log("--- Available Items ---");
  items.forEach((item) => {
    console.log(`${item.id}. ${item.name} - $${item.price}`);
  });
  console.log("-----------------------");
};

// Sample items for the cart
const items: CartItem[] = [
  { id: 1, name: "Item 1", price: 10, quantity: 0 },
  { id: 2, name: "Item 2", price: 15, quantity: 0 },
  { id: 3, name: "Item 3", price: 20, quantity: 0 },
];
// Main shopping cart app
const shoppingApp = (prompt: any): void => {
  let cart = initialCart;

  while (true) {
    console.log("\n--- Menu ---");
    console.log("1. Add Item to Cart");
    console.log("2. Remove Item from Cart");
    console.log("3. Update Item Quantity");
    console.log("4. View Cart");
    console.log("5. Exit");

    const choice = prompt("Enter your choice: ");

    switch (choice) {
      case "1":
        displayItems();
        const itemIdToAdd = prompt("Enter the ID of the item to add to cart: ");
        const quantityToAdd = prompt("Enter the quantity: ");
        const selectedItemIdToAdd = parseInt(itemIdToAdd, 10);
        const selectedQuantityToAdd = parseInt(quantityToAdd, 10);
        const selectedItemToAdd = items.find(
          (item) => item.id === selectedItemIdToAdd
        );
        if (selectedItemToAdd && !isNaN(selectedQuantityToAdd)) {
          cart = addItemToCart(cart, {
            ...selectedItemToAdd,
            quantity: selectedQuantityToAdd,
          });
          console.log("Item added to cart.");
        } else {
          console.log("Invalid item ID or quantity.");
        }
        break;
      case "2":
        displayCart(cart);
        const itemIdToRemove = prompt(
          "Enter the ID of the item to remove from cart: "
        );
        const selectedItemIdToRemove = parseInt(itemIdToRemove, 10);
        if (!isNaN(selectedItemIdToRemove)) {
          cart = removeItemFromCart(cart, selectedItemIdToRemove);
          console.log("Item removed from cart.");
        } else {
          console.log("Invalid item ID.");
        }
        break;
      case "3":
        displayCart(cart);
        const itemIdToUpdate = prompt(
          "Enter the ID of the item to update quantity: "
        );
        const quantityToUpdate = prompt("Enter the new quantity: ");
        const selectedItemIdToUpdate = parseInt(itemIdToUpdate, 10);
        const selectedQuantityToUpdate = parseInt(quantityToUpdate, 10);
        if (
          !isNaN(selectedItemIdToUpdate) &&
          !isNaN(selectedQuantityToUpdate)
        ) {
          cart = updateItemQuantity(
            cart,
            selectedItemIdToUpdate,
            selectedQuantityToUpdate
          );
          console.log("Quantity updated.");
        } else {
          console.log("Invalid item ID or quantity.");
        }
        break;
      case "4":
        displayCart(cart);
        break;
      case "5":
        console.log("Thank you for shopping with us! Goodbye!");
        return;
      default:
        console.log("Invalid choice. Please try again.");
        break;
    }
  }
};

export default shoppingApp;
