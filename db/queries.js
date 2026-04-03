const pool = require('../db/pool');

async function getAllMessages() {
    const result = await pool.query(`
        SELECT m.*, u.username AS user_username
        FROM messages m
        LEFT JOIN users u ON m.user_id = u.id
`);     
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

async function addMessage(title, text, user_id) {
    const result = await pool.query(`INSERT INTO messages (title, text, user_id) VALUES ($1, $2, $3) RETURNING *`, [title, text, user_id]);
    return result.rows[0];
};

async function updateStatus(user_id) {
    const result = await pool.query(`UPDATE users SET membership_status = 'member' WHERE id = $1 RETURNING *`, [user_id]);
    return result.rows[0];
}

module.exports = {
    getAllMessages,
    createUser,
    findUserByUsername,
    findUserById,
    addMessage,
    updateStatus
}; 
