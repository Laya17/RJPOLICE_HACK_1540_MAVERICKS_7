const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing)
app.use(express.json()); // Parse JSON request bodies

const db = mysql.createConnection({
    host: "localhost", // Database host
    user: "root", // Database username
    password: "", // Database password
    database: "cts" // Database name
});

// Handling POST request for user registration (signup)
app.post('/Signup', (req, res) => {
    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];

    db.query(sql, [values], (err, data) => {
        if(err) {
            return res.json("Error");
        }
        return res.json(data); // Respond with the result of the database query
    });
});

// Handling POST request for user login
app.post('/Login', (req, res) => {
    const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        if (data.length > 0) {
            return res.json("Success"); // If a matching user is found
        } else {
            return res.json("Fail"); // If no matching user is found
        }
    });
});

app.listen(8081, () => {
    console.log("Listening...");
});
