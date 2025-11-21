💰 Modern MERN Expense Tracker

A full-stack Expense Tracking application featuring a futuristic iOS 2026-inspired Glassmorphism UI. Built with the MERN stack (MongoDB, Express, React, Node.js), this app allows users to securely register, log in, and manage their daily finances with a beautiful, responsive interface.

📸 Screenshots

1.Futuristic Login (Glassmorphism)
<img width="1897" height="878" alt="image" src="https://github.com/user-attachments/assets/0aedc0d0-7f72-4a08-ba2a-43312cff8c70" />

2.Expense Dashboard
<img width="1908" height="855" alt="image" src="https://github.com/user-attachments/assets/f2a439e8-8b94-4ad8-877d-3216b90b9374" />


✨ Features

🔐 Secure Authentication:

User Registration and Login using JSON Web Tokens (JWT).

Password hashing with Bcrypt.

🎨 Modern UI/UX:

Glassmorphism Design: Frosted glass effects, vivid gradients, and semi-transparent layers using Tailwind CSS.

Fully responsive layout (Mobile & Desktop).

💸 Expense Management:

CRUD Operations: Create, Read, Update, and Delete expenses.

Data Visualization: View expenses in a clean, organized table format.

Total Calculation: Automatic calculation of total expenses.

🛠️ Tech Stack

Frontend

React.js: Component-based UI library.

Vite: Fast build tool and development server.

Tailwind CSS: Utility-first CSS framework for the Glassmorphism design.

React Router DOM: For seamless client-side navigation.

Backend

Node.js: Runtime environment.

Express.js: Web framework for the API.

Mongoose: ODM for MongoDB interaction.

JWT: For secure stateless authentication.

Cors: To handle Cross-Origin requests.

🚀 Getting Started

Follow these instructions to run the project locally.

Prerequisites

Node.js installed on your machine.

MongoDB installed locally or a MongoDB Atlas URI.

1. Clone the Repository

git clone [https://github.com/DineshReddyTech/expense-tracker.git](https://github.com/DineshReddyTech/expense-tracker.git)
cd expense-tracker


2. Backend Setup

Navigate to the backend folder and install dependencies:

cd backend
npm install


Create a .env file in the backend folder and add your variables:

PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_super_secret_key_here


Start the server:

npm start
# The server should run on http://localhost:5000


3. Frontend Setup

Open a new terminal (keep the backend running), navigate to the frontend folder, and install dependencies:

cd frontend
npm install


Start the React app:

npm run dev
# The app should run on http://localhost:5173 (or similar)


📂 Project Structure

expense-tracker/
├── backend/             # Node.js & Express API
│   ├── models/          # Mongoose Database Schemas
│   ├── routes/          # API Routes (Auth, Expenses)
│   └── server.js        # Entry point
│
└── frontend/            # React Application
    ├── src/
    │   ├── components/  # Reusable UI components
    │   ├── pages/       # Login, Register, Home
    │   └── App.jsx      # Main Component
    ├── tailwind.config  # Styling configuration
    └── vite.config.js   # Build configuration
