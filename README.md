
# 🎮 Game Theory Web Application 🏆

**College ID:** IEC2021046

## 📋 Project Overview

This is a web application that allows users to book sports courts at different facilities, check available times, and manage their bookings. The application includes a frontend built with React and Vite for an easy-to-use interface, and a backend developed with Express.js and MongoDB for secure and efficient data management.

## 📚 Table of Contents

- [🔗 Live Demo](#live-demo)
- [✨ Features](#features)
- [🛠️ Project Structure](#project-structure)
- [🔑 Prerequisites](#prerequisites)
- [⚙️ Installation](#installation)
- [🚀 Running the Application](#running-the-application)
- [🌐 Deployment](#deployment)
- [⚖️ Assumptions and Limitations](#assumptions-and-limitations)
- [📦 Dependencies](#dependencies)
- [⚠️ Special Instructions](#special-instructions)

## 🔗 Live Demo

You can access live versions of the frontend and backend applications through these links:

- **Documentation link:** [SportsBooking Documentation](https://drive.google.com/file/d/1sSQnFmCiQPu-fqNYm9ycVu4-UYPp1WhX/view?usp=drive_link)
- **Frontend:** [Live Frontend](https://sports-booking-frontend.vercel.app)
- **Backend:** [Live Backend](https://game-theory-backend.onrender.com)

## ✨ Features

- **User Authentication:** Secure login and registration using JWT tokens 🔐
- **Real-time Booking System:** Users can view and book available sports court slots 🏀
- **Responsive Design:** The UI adjusts to different screen sizes for a better experience 📱
- **Data Security:** Sensitive information is managed with environment variables and secure connections 🔒

## 🛠️ Project Structure

### Backend

The backend manages all API requests, user authentication, and database interactions.

- **config/:** Configuration files, including database connections ⚙️
- **controller/:** Logic for API routes, managing authentication and bookings 📜
- **model/:** MongoDB schemas for users, bookings, and court information 🗃️
- **routes/:** Definitions for all API routes 🚦
- **middleware/:** Custom middleware, such as authentication checks 🛡️

### Frontend

The frontend is created using React and Vite for quick development.

- **src/:** Source files for the frontend 💻
- **Components/:** Reusable components like buttons and forms 🔄
- **Pages/:** Application pages, including login, booking, and sports court displays 📝
- **App.jsx:** The main component that manages routing and page display 🧩

## 🔑 Prerequisites

Make sure you have the following installed:

- **Node.js:** Download from [nodejs.org](https://nodejs.org)
- **npm:** Comes with Node.js for package management 📦
- **Git:** For version control (optional but recommended) 🧑‍💻

## ⚙️ Installation

To set up the project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/kaifhb/SportsBooking.git
   cd GameTheory
   ```

2. **Install Backend Dependencies:**

   ```bash
   cd Backend
   npm install
   ```

3. **Install Frontend Dependencies:**

   ```bash
   cd ../frontend
   npm install
   ```

## 🚀 Running the Application

To run the application on your local machine:

1. **Start the Backend:**

   ```bash
   cd Backend
   npm start
   ```

   The backend API will run at [http://localhost:5000](http://localhost:5000).

2. **Start the Frontend:**

   ```bash
   cd ../frontend
   npm start
   ```

   The frontend will be available at [http://localhost:3000](http://localhost:3000).

## 🌐 Deployment

### Frontend Deployment

1. Connect your GitHub repository to Vercel 🌐
2. Set up your environment variables in Vercel’s dashboard ⚙️
3. Deploy the application with automated builds 🚀

### Backend Deployment

1. Use Render to deploy the backend as a web service 🌍
2. Configure necessary environment variables like `MONGO_URI`, `JWT_SECRET`, and `PORT` in the Render dashboard 🔑

## ⚖️ Assumptions and Limitations

- **Authentication:** JWT tokens are stored securely on the client side 🔒
- **Slot Availability:** The system fetches real-time data for available slots from the backend 🕒

## 📦 Dependencies

### Frontend:

- React ⚛️
- React Router DOM 🚗

### Backend:

- Express.js ⚡
- MongoDB with Mongoose 📊
- JWT for authentication 🔑
- bcryptjs for password hashing 🧑‍💻

## ⚠️ Special Instructions

- **Environment Variables:** Ensure that all sensitive information, like JWT secrets and database URIs, is stored securely 🔒
- **Styling Conflicts:** Use only Tailwind CSS to avoid issues with other styling libraries 🎨
