import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../features/cart/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const totalItems = cart.reduce((total, item) => total + item.count, 0);

  const totalPrice = cart
    .reduce((total, item) => total + item.price * item.count, 0)
    .toFixed(2);

  const handleCheckout = () => {
    dispatch(clearCart());
    sessionStorage.removeItem("cart");
    alert("Checkout successful! Your cart has been cleared.");
  };

  return (
    <div>
      <h2>Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                marginBottom: "1rem",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                width="100"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/100?text=No+Image";
                }}
              />

              <h4>{item.title}</h4>
              <p>Quantity: {item.count}</p>
              <p>Price: ${item.price}</p>

              <button onClick={() => dispatch(removeFromCart(item.id))}>
                Remove
              </button>
            </div>
          ))}

          <hr />

          <p>
            <strong>Total Items:</strong> {totalItems}
          </p>
          <p>
            <strong>Total Price:</strong> ${totalPrice}
          </p>

          <button onClick={handleCheckout}>Checkout</button>
        </>
      )}
    </div>
  );
}

export default Cart;
