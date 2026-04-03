const pool = require('../db/pool');

async function getAllMessages() {
    const result = await pool.query(`SELECT * FROM messages`);
    return result.rows;
}

async function createUser(name, last_name, username, password) {
    const result = await pool.query(`INSERT INTO users (name, last_name, username, password) VALUES ($1, $2, $3, $4) RETURNING *`, [name, last_name, username, password]);
    return result.rows[0];
}

async function findUserByUsername(username) {
    const result = await pool.query(`SELECT * FROM users WHERE username = $1`, [username]);
    return result.rows[0];
}


async function findUserById(id) {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
    return result.rows[0];
}

module.exports = {
    getAllMessages,
    createUser,
    findUserByUsername,
    findUserById
}; 