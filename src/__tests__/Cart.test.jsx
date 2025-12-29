import { render, screen } from "@testing-library/react";
import Cart from "../components/Cart";

describe("Cart", () => {
  test("displays correct number of items in cart", () => {
    const cartItems = [
      { id: 1, title: "Item 1", price: 10 },
      { id: 2, title: "Item 2", price: 20 },
    ];

    render(<Cart cartItems={cartItems} />);

    expect(screen.getByText(/2 items/i)).toBeInTheDocument();
  });
});
