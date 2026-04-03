
const db = require('../db/queries');
 const bcrypt = require("bcryptjs");
 
 


async function getMessages(req, res) {
    try {
        const messages = await db.getAllMessages();
        res.render('index', { messages });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).send('Internal Server Error');
    }
}
async function getDashboard(req, res) {
    res.render('dashboard', { user: req.user });
}

async function signUpGet(req, res) {
    res.render('signUpForm',  { errors: [] });
};

async function createUser(req, res) {
     const { name, last_name, username, password } = req.validatedData;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await db.createUser(name, last_name, username, hashedPassword);
        res.render('dashboard', { user: newUser, errors: [] });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
}

async function addMessage(req, res) {
    const { title, text } = req.validatedData;
    try {
        const newMessage = await db.addMessage(title, text, req.user.user_id);
        res.redirect('/');
    } catch (error) {
        console.error('Error adding message:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    getMessages,
    getDashboard,
    signUpGet,
    createUser,
    addMessage
};