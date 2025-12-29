import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const cart = useSelector((state) => state.cart.cart);
  const [user, setUser] = useState(null);

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // 🔥 LISTEN FOR LOGIN / LOGOUT
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    alert("Logged out");
  };

  return (
    <div>
      <h1>FakeStore E-commerce App</h1>

      <p>Status: {user ? `Logged in as ${user.email}` : "Not logged in"}</p>

      <nav style={{ marginBottom: "1rem" }}>
        <Link to="/" style={{ marginRight: "1rem" }}>
          Home
        </Link>

        {!user && (
          <>
            <Link to="/register" style={{ marginRight: "1rem" }}>
              Register
            </Link>
            <Link to="/login" style={{ marginRight: "1rem" }}>
              Login
            </Link>
          </>
        )}

        <Link to="/cart" style={{ marginRight: "1rem" }}>
          Cart
        </Link>

        {user && (
          <>
            <Link to="/orders" style={{ marginRight: "1rem" }}>
              Orders
            </Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </div>
  );
}

export default App;
