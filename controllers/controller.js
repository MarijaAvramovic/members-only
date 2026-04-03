const db = require('../db/queries');

async function getMessages(req, res) {
    try {
        const messages = await db.getAllMessages();
        res.render('index', { messages });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).send('Internal Server Error');
    }
}

async function signUpGet(req, res) {
    res.render('signUpForm');
};

module.exports = {
    getMessages,
    signUpGet
};