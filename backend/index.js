//CHANGE THE NAME
const express = require("express");

const app = express();
const mysql = require("mysql");
const cors = require("cors");

// supressing the error for stopping communication between frontend to backend
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "mySQLPASSword",
  database: "stock_demo_schema",
});

// route for create
app.post("/create", (req, res) => {
  const name = req.body.name;
  const country = req.body.country;
  const revenue = req.body.revenue;
  const marketplace = req.body.marketplace;
  db.query(
    "INSERT INTO companies (name, country, revenue, marketplace) VALUES(?, ?, ?, ?)",
    [name, country, revenue, marketplace],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values inserted");
      }
    }
  );
});

app.get("/companies", (req, res) => {
  db.query("SELECT * FROM companies", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Server starting on port 3001");
});
