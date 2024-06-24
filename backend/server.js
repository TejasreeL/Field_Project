const express = require("express");
const app = express();
require("dotenv").config();
const mysql = require("mysql2/promise");
const path = require("path");

// Deploying React build in this server
app.use(express.static(path.join(__dirname, "../my-pdf-app/build")));

// Importing and using the user routes
const userapp = require('./retrive');
app.use("/retrive", userapp);

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

async function connectToDatabase() {
  try {
    const pool = await mysql.createPool(dbConfig);
    console.log("Connected to the MySQL database");
    app.set("dbPool", pool);
  } catch (err) {
    console.error("Database connection failed:", err);
  }
}

connectToDatabase();

// To parse the body of requests
app.use(express.json());

// Serve the React app for any unknown paths
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "../my-pdf-app/build/index.html"));
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("Error:", error.message);
  res.status(500).send({ message: "error", payload: error.message });
});

// Assigning port number
const port = process.env.PORT || 7777;
app.listen(port, () => console.log(`Web server running on port ${port}`));
