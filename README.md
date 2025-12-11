# 📚 **Library Management System**

<p align="center">
  <img src="https://img.shields.io/badge/Status-Live-success?style=for-the-badge">
  <img src="https://img.shields.io/badge/Bootstrap-5.3.2-purple?style=for-the-badge&logo=bootstrap">
  <img src="https://img.shields.io/badge/Firebase-Cloud-orange?style=for-the-badge&logo=firebase">
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge">
</p>

A sleek, modern, and responsive **Library Management System** built using **JavaScript**, **Bootstrap 5**, and **Firebase Firestore**.
Designed with a **dark theme**, smooth interactions, real-time updates, and a complete borrow–return cycle.

This project demonstrates **clean UI/UX**, **solid architecture**, **cloud integration**, and **practical real-world use cases**.

---

# 🌐 **Live Demo**

👉 **[https://library-management-syste-d2bda.web.app/](https://library-management-syste-d2bda.web.app/)**

---

# ✨ **Why This Project Stands Out**

This isn’t just another CRUD project — it's a **full-fledged library automation system** with:

✔ Real-time Firestore database
✔ Beautiful, intuitive UI
✔ Borrow / return workflow
✔ Activity logging
✔ Clean, scalable code
✔ Strong browser compatibility
✔ LocalStorage fallback mode

It’s built to show **full-stack thinking**, **frontend polish**, and **cloud engineering skills** together.

---

# 🔥 **Features at a Glance**

## 📖 **Core Functionality**

* Add / Edit / Delete books
* Borrow and return with borrower tracking
* Real-time search (title / author / ISBN)
* Auto-updating statistics
* Time-stamped activity logs
* Fully responsive tables and cards

## 🎨 **UI & UX Highlights**

* Stunning **dark theme** with gradients
* Clean dashboard layout
* Hover animations, toasts, and modals
* Bootstrap 5 modern components
* Mobile-optimized design

## 🔧 **Technical Excellence**

* Firestore NoSQL cloud database
* Firebase hosting + SSL
* LocalStorage fallback for offline use
* Modular JS architecture
* Input validation + fail-safe error handling
* Smooth DOM rendering for performance

---

# 📸 **Screenshots**

<div align="center">

### 🏠 Dashboard

<img src="Screenshot 2025-12-11 124926.png" width="800">

### 📖 Book Management

<img src="Screenshot 2025-12-11 124933.png" width="800">

### 📊 Activity History

<img src="Screenshot 2025-12-11 124939.png" width="800">

</div>

---

# 🛠️ **Technology Stack**

### **Frontend**

* HTML5
* CSS3 + custom animations
* JavaScript (ES6+)
* Bootstrap 5
* Bootstrap Icons

### **Backend**

* Firebase Firestore (NoSQL DB)
* Firebase Hosting
* LocalStorage API

---

# 📁 **Project Structure**

```
library-management-system/
│
├── index.html            # Main UI
├── style.css             # UI styling
├── app.js                # Core logic
├── firebase-config.js    # Firebase credentials
│
├── assets/               # Images, icons, media
└── README.md             # Documentation
```

---

# 🚀 **Getting Started**

## ✔ Prerequisites

* Any modern browser
* (Optional) Firebase account

## ✔ Run Locally

```bash
git clone https://github.com/Jahnavi123-kakumani/library-management-system.git
cd library-management-system
```

Open **index.html** in a browser — that's it!
The app instantly works using **LocalStorage**.

---

# ☁️ **Deploying to Firebase**

### 1️⃣ Create a Firebase project

* Go to Firebase Console
* Create project → Enable Firestore → Enable Hosting

### 2️⃣ Insert your config

`firebase-config.js`:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 3️⃣ Deploy

```bash
npm install -g firebase-tools
firebase login
firebase init
firebase deploy
```

---

# 📖 **User Guide**

## **Adding Books**

✔ Enter Title, Author, ISBN
✔ Click **Add Book**

## **Managing Books**

✔ Edit book → Update details
✔ Delete book → Confirmation included
✔ Search → Instant filter

## **Borrowing & Returning**

✔ Borrow → Add borrower name
✔ Return → Status resets automatically
✔ History updates in real-time

## **History Logs**

✔ Shows full activity timeline
✔ Maintains timestamps & action type

---

# 🧠 **Data Models**

### 📘 Book Object

```javascript
{
  id: "unique",
  title: "Book Title",
  author: "Author Name",
  isbn: "978-3-16-148410-0",
  status: "Available" | "Borrowed",
  borrowedBy: "Name",
  borrowedDate: "",
  returnedDate: "",
  createdAt: "",
  updatedAt: ""
}
```

### 📜 History Object

```javascript
{
  id: "unique",
  bookId: "",
  bookTitle: "",
  borrowerName: "",
  action: "Borrowed" | "Returned",
  date: ""
}
```

---

# 🎯 **Performance Highlights**

* Zero external JS dependencies (pure JS)
* Optimized DOM manipulation
* Lazy loading of UI sections
* Local caching for faster access
* Minimal network overhead

---

# 🛠️ **Development Workflow**

Key functions include:

* `init()`
* `loadBooks()`
* `addBook()` / `updateBook()` / `deleteBook()`
* `borrowBook()` / `returnBook()`
* `updateStats()`
* `renderUI()`

Clear separation of concerns + modular functions.

---

# 📱 **Responsive Design**

Works flawlessly on:

📱 **Mobile**
📲 **Tablets**
💻 **Laptops**
🖥 **Desktops**

Layouts adjust automatically using Bootstraps flexible grid system.

---

# 🔐 **Security**

* Input sanitization
* Safe DOM manipulation
* No sensitive credentials exposed
* Firebase security rules ready

---

# 🗺 **Roadmap**

### 🚀 New Features Coming

* [ ] User authentication (Admin / Student)
* [ ] Due-date reminders + overdue alerts
* [ ] Categories & tagging
* [ ] QR codes for each book
* [ ] CSV import/export
* [ ] Multi-library support

### 🧪 Technical Upgrades

* [ ] PWA support
* [ ] Unit testing (Jest)
* [ ] Better accessibility (WCAG 2.1)
* [ ] CI/CD pipeline

---


# 👩‍💻 **Author**

**Kakumani Naga Jahnavi**
📍 Developer • Data Science Enthusiast • Web Developer
🔗 GitHub: [https://github.com/Jahnavi123-kakumani](https://github.com/Jahnavi123-kakumani)
🔗 LinkedIn: [https://www.linkedin.com/in/kakumani-naga-jahnavi-6283192a8](https://www.linkedin.com/in/kakumani-naga-jahnavi-6283192a8)

If you found this useful, please give it a **star ⭐** — it motivates more awesome projects!
