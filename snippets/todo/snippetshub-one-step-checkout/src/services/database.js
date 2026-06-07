const { Pool } = require('pg'); // Assuming PostgreSQL is used, adjust if necessary

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const connect = async () => {
    try {
        await pool.connect();
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error:', error);
        throw error;
    }
};

const query = async (text, params) => {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
};

const disconnect = async () => {
    await pool.end();
    console.log('Database connection closed');
};

module.exports = {
    connect,
    query,
    disconnect,
};