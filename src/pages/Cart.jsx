import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";

function Cart() {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  const placeOrder = async () => {
    if (!auth.currentUser) {
      alert("You must be logged in to place an order");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        userId: auth.currentUser.uid,
        items: cart,
        totalPrice,
        createdAt: serverTimestamp(),
      });

      dispatch(clearCart());
      alert("Order placed!");
    } catch (error) {
      alert("Error placing order");
      console.error(error);
    }
  };

  if (cart.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div>
      <h2>Shopping Cart</h2>

      {cart.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>${item.price}</p>
        </div>
      ))}

      <h3>Total: ${totalPrice.toFixed(2)}</h3>

      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}

export default Cart;
