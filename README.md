# Nykaa Clone - E-commerce Website

A full-stack e-commerce website inspired by Nykaa, built with **Node.js**, **Express**, **MongoDB**, and **Bootstrap**.

## 🚀 Features

- Display products with images, prices, and descriptions
- Filter products by category (Makeup, Skincare)
- Add products to cart (in-memory)
- Responsive design using Bootstrap 5
- RESTful API for product management
- Image URLs stored in database (CDN approach)

## 📁 Project Structure

```
nykaa-clone/
│
├── public/               # Frontend Files
│   ├── index.html        # Homepage
│   ├── styles.css        # Custom CSS
│   ├── script.js         # Frontend Logic
│   └── images/           # (Optional) Logo/Icons
│
├── models/               # Database Schemas
│   └── Product.js        # Product Model
│
├── routes/               # API Routes
│   └── productRoutes.js  # Product API Endpoints
│
├── server.js             # Main Server File
├── seed.js               # Database Seeding Script
├── package.json          # Dependencies
└── .env                  # Environment Variables
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (installed locally or MongoDB Atlas account)

### Step 1: Install Dependencies
```bash
cd nykaa-clone
npm install
```

### Step 2: Configure Environment Variables
The `.env` file is already created. If using MongoDB Atlas, update the `MONGO_URI`:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/nykaaDB
PORT=3000
```

### Step 3: Seed the Database
Run the seed script to populate the database with sample products:
```bash
npm run seed
```

You should see:
```
MongoDB Connected
Existing products cleared
✅ Database seeded successfully with 6 products
Database connection closed
```

### Step 4: Start the Server
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

### Step 5: Open in Browser
Navigate to: [http://localhost:3000](http://localhost:3000)

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/category/:category` | Get products by category |
| GET | `/api/products/:id` | Get single product by ID |

### Example API Call:
```javascript
// Get all products
fetch('http://localhost:3000/api/products')
  .then(res => res.json())
  .then(data => console.log(data));
```

## 🎨 Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6), Bootstrap 5
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Other**: dotenv (environment variables), CORS

## 📦 Available Scripts

```bash
npm start       # Start the server
npm run dev     # Start with nodemon (auto-restart)
npm run seed    # Seed the database with sample data
```

## 💡 How to Explain to Your Instructor

### 1. **Why Bootstrap?**
> "To ensure the website is responsive on mobile devices without writing excessive custom CSS, allowing me to focus on the backend logic."

### 2. **Where are the images stored?**
> "I stored the image URLs in the database instead of the files. This is industry standard (CDN approach) to keep the database light and load pages faster."

### 3. **Why this folder structure?**
> "I followed the MVC pattern (Model-View-Controller) to separate concerns: models for database schemas, routes for API endpoints, and public for frontend code."

## 🔧 Future Enhancements

- User authentication (login/signup)
- Persistent shopping cart (MongoDB)
- Payment gateway integration
- Product search functionality
- Admin panel for product management

## 👤 Author

**Abhee**

## 📝 License

This project is open-source and available for educational purposes.

---

Made with ❤️ for learning full-stack development
