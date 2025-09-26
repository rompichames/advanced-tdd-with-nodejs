// Main application entry point
export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

// Example of a more complex function for TDD
export function calculateTotal(items) {
  if (!Array.isArray(items)) {
    throw new Error('Items must be an array');
  }
  
  return items.reduce((total, item) => {
    if (typeof item.price !== 'number' || typeof item.quantity !== 'number') {
      throw new Error('Each item must have numeric price and quantity');
    }
    return total + (item.price * item.quantity);
  }, 0);
}

console.log('Advanced TDD with Node.js - Application started');
