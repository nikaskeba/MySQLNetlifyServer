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
