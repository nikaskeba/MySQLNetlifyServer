const mysql = require('mysql2/promise');

// MySQL connection configuration
const dbConfig = {
  host: 'https://162.240.77.218/',
  user: 'skeba_netlify',
  password: process.env.MYSQL_PASSWORD,
  database: 'skeba_netlify'
};
  const headers = {
    'Access-Control-Allow-Origin': 'http://localhost:3000', // Allow only this origin (your local development server)
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST'
  };
exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const data = JSON.parse(event.body);
  const biography = data.biography;

  try {
    const connection = await mysql.createConnection(dbConfig);
    await connection.execute('INSERT INTO user_biography (biography) VALUES (?)', [biography]);
    connection.end();
   return {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify({ message: 'Biography saved successfully' })
    };
  } catch (error) {
    console.error(error);
     return {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({ error: 'Failed to save biography' })
    };
  }
};
