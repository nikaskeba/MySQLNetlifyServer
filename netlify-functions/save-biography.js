const mysql = require('mysql2/promise');

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
      HEADERS,
      body: JSON.stringify({ message: 'Biography saved successfully' })
    };
  } catch (error) {
    console.error(error);
     return {
      statusCode: 500,
       HEADERS,
      body: JSON.stringify({ error: 'Failed to save biography' })
    };
  }
};
