const mysql = require('mysql2/promise');

// MySQL connection configuration
const dbConfig = {
  host: '162.240.77.218',
  user: 'skeba_netlify',
  password: process.env.MYSQL_PASSWORD,
  database: 'skeba_netlify'
};
cconst headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin',
  'Content-Type': 'application/json',
  'Access-Control-Max-Age': '8640'
};

exports.handler = async (event, context) => {
  // Handle the preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers
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