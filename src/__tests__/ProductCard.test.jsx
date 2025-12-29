import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../components/ProductCard";

describe("ProductCard", () => {
  const mockProduct = {
    id: 1,
    title: "Test Product",
    price: 25,
  };

  test("renders product title and price", () => {
    render(<ProductCard product={mockProduct} addToCart={() => {}} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$25")).toBeInTheDocument();
  });

  test("calls addToCart when button is clicked", () => {
    const addToCartMock = vi.fn();

    render(<ProductCard product={mockProduct} addToCart={addToCartMock} />);

    fireEvent.click(screen.getByRole("button", { name: /add to cart/i }));

    expect(addToCartMock).toHaveBeenCalledTimes(1);
  });
});
