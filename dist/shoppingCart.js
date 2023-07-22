"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const immer_1 = require("immer");
const initialCart = {
    items: [],
};
// Helper function to update the cart state using Immer
const updateCart = (draft, updater) => (0, immer_1.produce)(draft, updater);
// Add an item to the cart
const addItemToCart = (cart, item) => {
    return updateCart(cart, (draft) => {
        draft.items.push(item);
    });
};
// Remove an item from the cart
const removeItemFromCart = (cart, itemId) => {
    return updateCart(cart, (draft) => {
        draft.items = draft.items.filter((item) => item.id !== itemId);
    });
};
// Update the quantity of an item in the cart
const updateItemQuantity = (cart, itemId, quantity) => {
    return updateCart(cart, (draft) => {
        const itemIndex = draft.items.findIndex((item) => item.id === itemId);
        if (itemIndex !== -1) {
            draft.items[itemIndex].quantity = quantity;
        }
    });
};
// Function to display the cart
const displayCart = (cart) => {
    console.log("--- Shopping Cart ---");
    cart.items.forEach((item) => {
        console.log(`${item.name} (Quantity: ${item.quantity}) - $${item.price * item.quantity}`);
    });
    console.log("--------------------");
};
// Function to display available items
const displayItems = () => {
    console.log("--- Available Items ---");
    items.forEach((item) => {
        console.log(`${item.id}. ${item.name} - $${item.price}`);
    });
    console.log("-----------------------");
};
// Sample items for the cart
const items = [
    { id: 1, name: "Item 1", price: 10, quantity: 0 },
    { id: 2, name: "Item 2", price: 15, quantity: 0 },
    { id: 3, name: "Item 3", price: 20, quantity: 0 },
];
// Main shopping cart app
const shoppingApp = (prompt) => {
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
                const selectedItemToAdd = items.find((item) => item.id === selectedItemIdToAdd);
                if (selectedItemToAdd && !isNaN(selectedQuantityToAdd)) {
                    cart = addItemToCart(cart, Object.assign(Object.assign({}, selectedItemToAdd), { quantity: selectedQuantityToAdd }));
                    console.log("Item added to cart.");
                }
                else {
                    console.log("Invalid item ID or quantity.");
                }
                break;
            case "2":
                displayCart(cart);
                const itemIdToRemove = prompt("Enter the ID of the item to remove from cart: ");
                const selectedItemIdToRemove = parseInt(itemIdToRemove, 10);
                if (!isNaN(selectedItemIdToRemove)) {
                    cart = removeItemFromCart(cart, selectedItemIdToRemove);
                    console.log("Item removed from cart.");
                }
                else {
                    console.log("Invalid item ID.");
                }
                break;
            case "3":
                displayCart(cart);
                const itemIdToUpdate = prompt("Enter the ID of the item to update quantity: ");
                const quantityToUpdate = prompt("Enter the new quantity: ");
                const selectedItemIdToUpdate = parseInt(itemIdToUpdate, 10);
                const selectedQuantityToUpdate = parseInt(quantityToUpdate, 10);
                if (!isNaN(selectedItemIdToUpdate) &&
                    !isNaN(selectedQuantityToUpdate)) {
                    cart = updateItemQuantity(cart, selectedItemIdToUpdate, selectedQuantityToUpdate);
                    console.log("Quantity updated.");
                }
                else {
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
exports.default = shoppingApp;
