# AI Virtual Assistant 🤖

An intelligent AI-powered Virtual Assistant built with the MERN stack, Vite, and TailwindCSS.
This assistant can process user commands, provide smart responses, and deliver an interactive chat-like experience with a modern UI.

## 🌟 Features

🔹 AI-Powered Responses – Uses AI APIs for natural language understanding.

🔹 MERN Stack – MongoDB, Express.js, React (with Vite), and Node.js.

🔹 Modern UI – Built with TailwindCSS for responsive and clean design.

🔹 Authentication – Secure login & signup with JWT & cookies.

🔹 Real-Time Interaction – Smooth conversation flow with async API calls.

🔹 Customizable Assistant Persona – Give your assistant a name & personality.

🔹 Deployment Ready – Configured for production on platforms like Vercel, Netlify, or Render.

## 🛠️ Tech Stack

## Frontend:

⚡ React + Vite

🎨 TailwindCSS

🔄 Axios

## Backend:

🌐 Node.js

🚀 Express.js

🗄 MongoDB & Mongoose

## AI Integration:

🤖 Google Gemini / OpenAI API (customizable)

## 📂 Project Structure
Ai-Assistant/
│
|
├── Backend/                     # Backend (Node + Express)
│   ├── config/
|   |   |
│   │   ├── cloudinary.js        # Cloudinary configuration
|   |   |
│   │   ├── db.js                # MongoDB connection
|   |   |
│   │   └── token.js             # JWT token utilities
│   │
│   ├── controllers/
│   │   ├── auth.js              # Auth logic (signup/login)
│   │   └── user.js              # User profile & data handling
│   │
│   ├── middlewares/
│   │   ├── isAuth.js            # Auth middleware
│   │   └── multer.js            # Multer config for file uploads
│   │
│   ├── models/
│   │   └── user.js              # User schema
│   │
│   ├── routes/
│   │   ├── auth.js              # Auth routes
│   │   └── user.js              # User routes
│   │
│   ├── gemini.js                # Gemini AI API integration
│   └── server.js                # Express server entry
│
├── Frontend/                     # Frontend (React + Vite)
│   ├── src/
│   │   ├── assets/              # Images, icons, etc.
│   │   ├── components/
│   │   │   └── card.jsx         # Reusable card component
│   │   ├── context/
│   │   │   └── UserContext.jsx  # Context for global user data
│   │   ├── pages/               # Main pages
│   │   │   ├── customize.js     # Assistant customization page
│   │   │   ├── customize2.jsx   # Additional customization
│   │   │   ├── header.jsx       # Header UI
│   │   │   ├── home.jsx         # Home page
│   │   │   ├── signin.jsx       # Sign-in page
│   │   │   └── signup.jsx       # Sign-up page
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   └── index.html
│
└── README.md


## ⚙️ Installation & Setup
## 1️⃣ Clone the Repository
git clone https://github.com/your-username/ai-virtual-assistant.git
cd ai-virtual-assistant

## 2️⃣ Backend Setup
cd Backend
npm install
npm run dev

## Create a .env file inside backend/ with:

PORT=5000
MONGO_URI=your_mongo_connection
JWT_SECRET=your_jwt_secret
AI_API_KEY=your_ai_api_key

## 3️⃣ Frontend Setup
cd Frontend
npm install
npm run dev

## Project link Demo
Click Here [Virtual Assistant](https://ai-assistant-60a0.onrender.com/)

## 🚀 Deployment

Frontend → Deploy on Render 

Backend → Deploy on Render 

Database → Use MongoDB Atlas

## 📸 Screenshots

(Add your project screenshots here, e.g. UI, chat screen, login page)

## 🤝 Contributing

Contributions are welcome!

Fork the repo

Create a new branch

Commit changes

Open a PR

## 📜 License

This project is licensed under the MIT License.

## ✨ Made with ❤️ by [Shaik Albaz]
