import { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!auth.currentUser) return;

      const q = query(
        collection(db, "orders"),
        where("userId", "==", auth.currentUser.uid),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);
      const ordersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(ordersData);
    };

    fetchOrders();
  }, []);

  if (!auth.currentUser) {
    return <p>Please login to view orders.</p>;
  }

  return (
    <div>
      <h2>Order History</h2>

      {orders.length === 0 && <p>No orders yet.</p>}

      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            margin: "1rem 0",
          }}
        >
          <p>
            <strong>Order ID:</strong> {order.id}
          </p>
          <p>
            <strong>Total:</strong> ${order.totalPrice.toFixed(2)}
          </p>
          <p>
            <strong>Date:</strong> {order.createdAt?.toDate().toLocaleString()}
          </p>

          <h4>Items:</h4>
          {order.items.map((item) => (
            <p key={item.id}>
              {item.title} - ${item.price}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Orders;
