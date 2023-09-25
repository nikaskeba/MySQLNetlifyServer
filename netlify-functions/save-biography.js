const mysql = require('mysql2/promise');

// MySQL connection configuration
const dbConfig = {
  host: '162.240.77.218:3306',
  user: 'skeba_netlify',
  password: process.env.MYSQL_PASSWORD,
  database: 'skeba_netlify'
};
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Origin, Accept, X-Requested-With',
  'Content-Type': 'application/json',
  'Access-Control-Max-Age': '8640'
};

exports.handler = async (event, context) => {
  // Handle OPTIONS request for CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200, // IMPORTANT: Return 200 for OPTIONS method
      headers: headers
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: 'Method Not Allowed' };
  }

  const data = JSON.parse(event.body);
  const biography = data.biography;

  try {
    const connection = await mysql.createConnection(dbConfig);
    await connection.execute('INSERT INTO user_biography (biography) VALUES (?)', [biography]);
    connection.end();
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Biography saved successfully' })
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to save biography' })
    };
  }
};