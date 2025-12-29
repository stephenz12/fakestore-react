import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import App from "../App";
import cartReducer from "../store/cartSlice";

vi.mock("../api/fakestore", () => ({
  fetchProducts: async () => [
    {
      id: 1,
      title: "Test Product",
      price: 19.99,
      description: "My first Firestore product",
      category: "test",
      image: "",
    },
  ],
}));

beforeEach(() => {
  sessionStorage.clear();
});

describe("Integration: Add to Cart flow", () => {
  test("adds product to cart and displays it in cart page", async () => {
    const store = configureStore({
      reducer: {
        cart: cartReducer,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );

    // Wait for products to load
    const addToCartButton = await screen.findByRole("button", {
      name: /add to cart/i,
    });

    fireEvent.click(addToCartButton);

    // Navigate to cart
    fireEvent.click(screen.getByRole("link", { name: /cart/i }));

    // Assert product appears in cart
    expect(await screen.findByText(/test product/i)).toBeInTheDocument();
  });
});
