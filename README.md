# Event Manager

A full-stack MVC web application for managing community events.

## Project Overview

The Event Manager application allows users to register and log in securely. Authenticated users can create, view, update, and delete community events.

The application uses the Model-View-Controller (MVC) architectural pattern and stores event information in an SQLite database.

## Features

- User registration and login
- Secure password hashing with bcrypt
- Session-based authentication
- Create, view, update and delete events
- Server-side form validation
- Responsive interface using Bootstrap
- REST API returning event data as JSON
- Event-list caching with a 60-second expiry
- Centralised error handling

## Technologies Used

The application was developed using the following technologies:

- Node.js
- Express.js
- EJS (Embedded JavaScript Templates)
- Sequelize ORM
- SQLite
- bcrypt
- express-session
- express-validator
- Morgan
- dotenv
- express-ejs-layouts
- HTML
- CSS
- JavaScript

## Installation and Setup

Follow these steps to run the application locally.

### 1. Prerequisites

Before starting, make sure you have installed:

- Node.js
- npm
- Visual Studio Code (recommended)

### 2. Clone the Repository

Clone the project repository from GitHub:

git clone YOUR_GITHUB_REPOSITORY_URL

Navigate into the project directory:

cd Event_Manager_Capstone

### 3. Install Dependencies

Run the following command:

npm install

### 4. Configure Environment Variables

Create a `.env` file in the project root directory.

Add the following variables:

SESSION_SECRET=your_secure_session_secret

Replace `your_secure_session_secret` with a strong, private secret. The application uses port 3000 by default.

### 5. Database Setup

The application uses SQLite with Sequelize.

The database file is named `event_manager.sqlite` and is stored in the project root directory.

Sequelize automatically creates the database tables when the application starts.

### 6. Start the Application

Run:

npm start

Open your browser and visit:

http://localhost:3000

## API Endpoint

The application provides a REST API endpoint that returns event information in JSON format.

### Get All Events

- Method: GET
- Endpoint: `/api/events`
- Full URL: `http://localhost:3000/api/events`

The endpoint returns:
- A success status
- The total number of events
- An array containing event information

Example response:

{
  "success": true,
  "count": 1,
  "data": [
    {
      "eventId": 3,
      "title": "Example Community Event",
      "description": "A community event.",
      "date": "2026-12-25T00:00:00.000Z",
      "location": "Midrand, Gauteng",
      "isActive": true
    }
  ]
}