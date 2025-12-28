import { useQuery } from "@tanstack/react-query";
import {
  fetchProducts,
  fetchCategories,
  fetchProductsByCategory,
} from "../api/fakestore";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { useState } from "react";

function Home() {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch all categories
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // Fetch all products OR category products
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: () =>
      selectedCategory
        ? fetchProductsByCategory(selectedCategory)
        : fetchProducts(),
  });

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products</p>;

  return (
    <div>
      <h2>Products</h2>

      {/* Category Dropdown */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories?.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{ border: "1px solid #ccc", padding: "1rem" }}
          >
            <img
              src={product.image}
              alt={product.title}
              width="150"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/150?text=No+Image";
              }}
            />

            <h3>{product.title}</h3>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Price:</strong> ${product.price}
            </p>
            <p>{product.description}</p>
            <p>
              <strong>Rating:</strong> {product.rating?.rate}
            </p>

            <button onClick={() => dispatch(addToCart(product))}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
