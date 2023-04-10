const express = require("express");
const mysql = require("mysql");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_Auther.json');

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  next();
});

const key = "admin";

const validateApiKey = (req, res, next) => {
  const apiKey = req.get('Authorization');
  if (!apiKey || apiKey !== key) {
    return res.status(401).json({ message: 'Invalid API key' });
  }
  next();
};

app.use(validateApiKey);

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