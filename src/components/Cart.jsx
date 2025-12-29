export default function Cart({ cartItems }) {
  return (
    <div>
      <h2>Cart</h2>
      <p>{cartItems.length} items</p>
    </div>
  );
}
