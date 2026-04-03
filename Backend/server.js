const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock Products Data
const products = [
  { id: 1, name: "Wireless Noise-Cancelling Headphones", price: 299.99, category: "Electronics", imageUrl: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=400&q=80" },
  { id: 2, name: "Minimalist Leather Watch", price: 149.00, category: "Accessories", imageUrl: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=400&q=80" },
  { id: 3, name: "Smart Fitness Band", price: 59.99, category: "Electronics", imageUrl: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b0?auto=format&fit=crop&w=400&q=80" },
  { id: 4, name: "Classic Aviator Sunglasses", price: 89.50, category: "Accessories", imageUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80" },
  { id: 5, name: "Ergonomic Office Chair", price: 349.00, category: "Furniture", imageUrl: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=400&q=80" },
  { id: 6, name: "Cotton Blend Sweatshirt", price: 45.00, category: "Clothing", imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=80" },
  { id: 7, name: "Premium Artisan Coffee Beans", price: 24.99, category: "Groceries", imageUrl: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=400&q=80" },
  { id: 8, name: "Mechanical Keyboard (RGB)", price: 129.99, category: "Electronics", imageUrl: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=400&q=80" },
  { id: 9, name: "Canvas Backpack", price: 79.99, category: "Accessories", imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80" },
  { id: 10, name: "Waterproof Hiking Boots", price: 189.95, category: "Clothing", imageUrl: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=400&q=80" }
];

app.get("/api/products", (req, res) => {
  let { search, category, sort } = req.query;
  
  let result = [...products];

  // 1. Filter by category
  if (category && category !== "All") {
    result = result.filter(p => p.category === category);
  }

  // 2. Search by name (case-insensitive)
  if (search) {
    const searchLower = search.toLowerCase();
    result = result.filter(p => p.name.toLowerCase().includes(searchLower));
  }

  // 3. Sort by price
  if (sort === "low_to_high") {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === "high_to_low") {
    result.sort((a, b) => b.price - a.price);
  }

  // Artificial delay to simulate network
  setTimeout(() => {
    res.json(result);
  }, 300);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
