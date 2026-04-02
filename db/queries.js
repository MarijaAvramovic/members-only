const pool = require('../db/pool');

async function getAllMessages() {
    const result = await pool.query(`SELECT * FROM messages`);
    return result.rows;
}

 

module.exports = {
    getAllMessages
};