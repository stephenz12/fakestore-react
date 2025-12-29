export default function ProductCard({ product, addToCart }) {
  return (
    <div>
      <h2>{product.title}</h2>
      <p>${product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}
