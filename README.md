# 🛒 Firebase React E-Commerce App

This project is a React-based e-commerce application that integrates **Firebase Authentication** and **Firestore** for managing users, products, and orders.  
It replaces the FakeStore API with Firebase as the backend.

---

## 🚀 Features

### 🔐 Authentication (Firebase Auth)

- User **registration** with email & password
- User **login** and **logout**
- Authentication state tracking (logged in / logged out)

### 👤 User Management (Firestore)

- User profiles stored in Firestore (`users` collection)
- Each user is linked to their Firebase Auth UID

### 🛍️ Product Management (Firestore)

- Products are stored in Firestore (`products` collection)
- Home page fetches products from Firestore
- Category filtering
- Add products to cart

### 🛒 Cart & Orders (Firestore)

- Cart managed with Redux
- Place orders from cart
- Orders stored in Firestore (`orders` collection)
- Each order includes:
  - User ID
  - Products
  - Total price
  - Timestamp

### 📦 Order History

- Logged-in users can view their past orders
- Orders are filtered by the current user
- Displays order details and items

---

## 🧱 Tech Stack

- **React**
- **React Router**
- **Redux Toolkit**
- **Firebase Authentication**
- **Firebase Firestore**
- **Vite**

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

## 🚀 Live Demo

https://YOUR-VERCEL-APP.vercel.app

## 🧪 Testing

This project includes:

- Unit tests using Vitest and React Testing Library
- An integration test that validates the Add-to-Cart user flow
- Tests are run automatically in the CI pipeline

## 🔁 CI/CD Pipeline

A GitHub Actions CI/CD pipeline is configured to:

- Run tests and build the app on every push to the main branch
- Automatically deploy the application to Vercel after all tests pass

## 📦 Repository

https://github.com/YOUR_USERNAME/fakestore-react
