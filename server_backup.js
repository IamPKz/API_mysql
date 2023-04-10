const express = require("express");
const mysql = require("mysql");
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = YAML.load('./swagger_output.json');

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  next();
});

// MYSQL Connection

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "mysql_nodejs",
  port: "3306",
});

connection.connect((err) => {
  if (err) {
    console.log("Error connecting to database");
    return;
  }
  console.log("Mysql succesful connecttion");
});

// Routes

app.post("/create", async (req, res) => {
  const data = req.body;

  try {
    const values = data.map(
      ({ equation, xl, xr, tolerance, maxIterations }) => [
        equation,
        xl,
        xr,
        tolerance,
        maxIterations,
      ]
    );

    connection.query(
      "INSERT INTO falseposition(equation, xl, xr , tolerance , maxIterations) VALUES ?",
      [values],
      (err, results, fields) => {
        if (err) {
          console.log("Error while inserting");
          console.log(err);
          return res.status(400).send();
        }
        return res
          .status(201)
          .json({ message: "New rows successfully created" });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

// READ

app.get("/read", async (req, res) => {
  try {
    connection.query("SELECT * FROM users", (err, results, fields) => {
      if (err) {
        console.log("Error while reading data from database");
        return res.status(400).send();
      }
      res.status(200).json(results);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

// READ single user from db
app.get("/read/single/:email", async (req, res) => {
  const email = req.params.email;

  try {
    connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (err, results, fields) => {
        if (err) {
          console.log("Error while reading data from database");
          return res.status(400).send();
        }
        res.status(200).json(results);
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

// UPDATE

app.patch("/update/:email", async (req, res) => {
  const email = req.params.email;
  const newPassword = req.body.newPassword;

  try {
    connection.query(
      "UPDATE users SET password = ? WHERE email = ?",
      [newPassword, email],
      (err, results, fields) => {
        if (err) {
          console.log("Error while updating data to database");
          console.log(err);
          return res.status(400).send();
        }
        res
          .status(200)
          .json({ message: "Users password updated successfully" });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

// Delete

app.delete("/delete/:email", async (req, res) => {
  const email = req.params.email;
  try {
    connection.query(
      "DELETE FROM users WHERE email = ? ",
      [email],
      (err, results, fields) => {
        if (err) {
          console.log("Error while deleting data to database");
          console.log(err);
          return res.status(400).send();
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: "No user with that email" });
        }
        return res.status(200).json({ message: "User deleted successfully" });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});


/**
 * @swagger
 * /bisection/random:
 *   get:
 *     summary: Returns random json
 *     description: Returns a random json
 *     responses:
 *       200:
 *         description: A random json
 */

app.get("/bisection/random", async (req, res) => {
  const randomId = Math.floor(Math.random() * 12) + 1;

  try {
    connection.query(
      "SELECT * FROM bisection WHERE id = ?",
      [randomId],
      (err, results, fields) => {
        if (err) {
          console.log("Error while retrieving data");
          console.log(err);
          return res.status(400).send();
        }
        return res.status(200).json(results[0]);
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

app.get("/falseposition/random", async (req, res) => {
  const randomId = Math.floor(Math.random() * 15) + 1;

  try {
    connection.query(
      "SELECT * FROM falseposition WHERE id = ?",
      [randomId],
      (err, results, fields) => {
        if (err) {
          console.log("Error while retrieving data");
          console.log(err);
          return res.status(400).send();
        }
        return res.status(200).json(results[0]);
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});
app.listen(3000, () => console.log("server is running at port 3000"));

module.exports = app;