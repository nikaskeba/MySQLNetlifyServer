const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

const app = express();
const port = 3001;

// MySQL connection configuration
const dbConfig = {
  host: 'https://162.240.77.218/',
  user: 'skeba_netlify',
  password: process.env.MYSQL_PASSWORD,
  database: 'skeba_netlify'
};
 let HEADERS = {
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin',
  'Content-Type': 'application/json', //optional
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Max-Age': '8640'
}

//This solves the "No ‘Access-Control-Allow-Origin’ header is present on the requested resource."

HEADERS['Access-Control-Allow-Origin'] = '*'
HEADERS['Vary'] = 'Origin'
app.use(bodyParser.json());

// Endpoint to save biography
app.post('/save-biography', async (req, res) => {
  const biography = req.body.biography;

  try {
    const connection = await mysql.createConnection(dbConfig);
    await connection.execute('INSERT INTO user_biography (biography) VALUES (?)', [biography]);
    connection.end();

    res.status(200).send({ message: 'Biography saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to save biography' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
