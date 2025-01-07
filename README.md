
# Application Setup and Usage Guide

## Frontend Setup
1. Open a terminal.
3. Run the following commands:
   ```bash
   npm install
   ng serve
   ```
4. The frontend will be available at [http://localhost:4200](http://localhost:4200).

## Backend Setup
1. Open another terminal.
2. Navigate to  server directory (cd server).
3. Run the following commands:
   ```bash
   npm install
   node server.js
   ```
4. The backend will start running, ready to handle requests.

---

## Routing Information
- **Authentication Required:**  
  Most routes require you to be logged in to access them.

- **Admin Route:**  
  Access the admin login page at:  
  [http://localhost:4200/admin/login](http://localhost:4200/admin/login)

---

## Creating an Admin Account
1. First, register a **client account** via the frontend.
2. Update the role of the created account to `admin` in the database (MongoDB).

---

Feel free to customize further or add additional instructions as needed.
