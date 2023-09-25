const mysql = require('mysql2/promise');

// MySQL connection configuration
const dbConfig = {
  host: 'your_mysql_host',
  user: 'your_mysql_user',
  password: process.env.MYSQL_PASSWORD,
  database: 'your_database_name'
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
      body: JSON.stringify({ message: 'Biography saved successfully' })
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to save biography' })
    };
  }
};
