# MERN Stack Student Management and Attendance System

This application is a full-featured student management and attendance system built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). The system allows administrators to manage student records and students to mark their attendance. Students can change their attendance status only once every two hours.

## Features

### Admin

- Add new students
- Update student information
- Delete students
- View all students

### Student

- Login with credentials provided by the admin
- Mark attendance as present or absent
- Change attendance status (only allowed once every two hours)

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/UzairKhan313/mern-attendence-mangement-system.git
   cd mern-attendance-system
   ```

2. **Install backend dependencies:**

   ```bash
   cd frontend
   npm install

   ```

3. **Install backend dependencies:**

   ```bash
   cd backend
   npm install

   ```

4. **Set up environment variables:**
   create .env file in root directory with he following content:
   PORT=5000
   MONGO_URI=your_mongo_db_connection_string
   JWT_SECRET=your_jwt_secret

5. **Run the application:**
   start the frontend.
   ```bash
   npm run client
   ```
   start the backend server.
   ```bash
   npm run server
   ```
