

### Revised README

# Game Theory Web Application

**College ID:** (IEC2021046)
**Project Overview**  
This is a web application designed to allow users to book sports courts at various facilities, view available slots, and manage bookings. The application consists of a **frontend** built using React and Vite for a seamless user interface, and a **backend** developed with Express.js and MongoDB, ensuring secure and efficient data management.

---

### Table of Contents

- [Live Demo](#live-demo)
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Deployment](#deployment)
- [Assumptions and Limitations](#assumptions-and-limitations)
- [Dependencies](#dependencies)
- [Special Instructions](#special-instructions)

---

### Live Demo

Access live versions of the frontend and backend applications via the following links:

- **Frontend:** [https://sports-booking-frontend.vercel.app](https://sports-booking-frontend.vercel.app)
- **Backend:** [https://game-theory-backend.onrender.com](https://sportsbookingbackend-d0cz.onrender.com)

---

### Features

1. **User Authentication:** Secure login and registration using JWT tokens.
2. **Real-time Booking System:** Users can view and book available sports court slots.
3. **Responsive Design:** The UI adapts to different screen sizes for optimal user experience.
4. **Data Security:** All sensitive information is managed using environment variables and secure connections.

---

### Project Structure

**Backend**  
The backend handles all API requests, user authentication, and database interactions.

- **config/**: Holds configuration files, such as database connections.
- **controller/**: Defines the logic behind the API routes, handling authentication and bookings.
- **model/**: MongoDB schemas for users, bookings, and court data.
- **routes/**: Contains all the API route definitions for the application.
- **middleware/**: Holds custom middleware such as authentication checks.

**Frontend**  
The frontend is built using React and Vite for fast development.

- **src/**: Contains all the source files for the frontend.
  - **Components/**: Reusable components such as buttons, forms, etc.
  - **Pages/**: Pages of the application such as login, booking, and sports court display.
  - **utils/**: Helper functions and utilities for managing dates, authentication, etc.
  - **App.jsx**: The root component that handles routing and page management.

---

### Prerequisites

Ensure you have the following installed before starting:

- **Node.js**: Download from [nodejs.org](https://nodejs.org)
- **npm**: Comes with Node.js for package management.
- **Git**: For version control. (Optional but recommended)

---

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/GameTheory.git
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

---

### Running the Application

To run the application locally:

1. **Start the Backend:**

   ```bash
   cd Backend
   npm start
   ```

   The backend API will be running at `http://localhost:5000`.

2. **Start the Frontend:**

   ```bash
   cd ../frontend
   npm start
   ```

   The frontend will be accessible at `http://localhost:3000`.

---

### Deployment

The application is deployed using **Vercel** for the frontend and **Render.com** for the backend.

- **Frontend Deployment:**
  - Connect your GitHub repository to Vercel.
  - Set up your environment variables in Vercel’s dashboard.
  - Deploy the application directly with automated builds.

- **Backend Deployment:**
  - Use Render to deploy the backend as a web service.
  - Configure necessary environment variables like `MONGO_URI`, `JWT_SECRET`, and `PORT` in the Render dashboard.

---

### Assumptions and Limitations

- **Authentication:** JWT tokens are stored securely on the client side.
- **Slot Availability:** The system fetches real-time data for available slots from the backend.
- **Date Range:** The system currently supports booking within a 7-day window.

---

### Dependencies

**Frontend:**
- React
- Chakra UI
- React Router DOM

**Backend:**
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

---

### Special Instructions

1. **Environment Variables:** Ensure all sensitive data such as JWT secrets and database URIs are managed securely.
2. **Styling Conflicts:** Use only Chakra UI or CSS-in-JS to avoid conflicts with other styling libraries.

---
### Revised Project File Structure

```
/GameTheory
  ├── Backend
  │   ├── config/
  │   ├── controller/
  │   ├── middleware/
  │   ├── model/
  │   ├── routes/
  │   ├── node_modules/
  │   ├── .env
  │   ├── index.js
  │   ├── package-lock.json
  │   └── package.json
  ├── frontend
  │   ├── node_modules/
  │   ├── public/
  │   │   └── vite.svg
  │   ├── src/
  │   │   ├── assets/
  │   │   ├── Components/
  │   │   ├── Pages/
  │   │   │   ├── BookCourtPage.jsx
  │   │   │   ├── CentresDisplayPages.jsx
  │   │   │   ├── LoginPage.jsx
  │   │   │   ├── RegistrationPage.jsx
  │   │   │   └── SportsDisplayPage.jsx
  │   │   ├── App.jsx
  │   │   ├── main.jsx
  │   │   └── utils/
  │   ├── .env
  │   ├── constants.js
  │   ├── eslint.config.js
  │   ├── index.html
  │   ├── package-lock.json
  │   ├── package.json
  │   ├── postcss.config.js
  │   ├── README.md
  │   ├── tailwind.config.js
  │   └── vite.config.js
  └── README.md
```

---
