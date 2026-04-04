
const db = require('../db/queries');
 const bcrypt = require("bcryptjs");
 
 


async function getMessages(req, res) {
    try {
        const messages = await db.getAllMessages();
        console.log(messages)
        res.render('index', { messages });
        
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).send('Internal Server Error');
    }
}
async function getDashboard(req, res) {
    res.render('dashboard', { user: req.user, errorsJoin: [], errorsAdmin: [] });
}

async function signUpGet(req, res) {
    res.render('signUpForm',  { errors: [] });
};

async function createUser(req, res) {
     const { name, last_name, username, password } = req.validatedData;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await db.createUser(name, last_name, username, hashedPassword);
        res.render('wellDone', { user: newUser, errors: [] , errorsJoin: [], errorsAdmin: []});
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
}

async function addMessage(req, res) {
    const { title, text } = req.validatedData;
    user_id = req.user.id;
    try {
        const newMessage = await db.addMessage(title, text, user_id);
        res.redirect('/');
    } catch (error) {
        console.error('Error adding message:', error);
        res.status(500).send('Internal Server Error');
    }
}

async function join(req, res) {
    
     const errorsJoin = req.validationErrors || [];

     if (errorsJoin.length > 0) {
        return res.render('dashboard', { 
            user: req.user, 
            errorsJoin: errorsJoin,
            errorsAdmin: []
        });
    }

    try {
        const updatedUser = await db.updateStatus(req.user.id);    

        res.render('dashboard', { 
            user: updatedUser, 
            errorsJoin: [] ,
            errorsAdmin: []
        });
    } catch (error) {
        console.error('Error updating membership status:', error);
        res.status(500).send('Failed to update your membership. Nice one.');
    }
}

async function adminEdit(req, res) {
    
     const errorsAdmin = req.validationErrors || [];

     if (errorsAdmin.length > 0) {
        return res.render('dashboard', { 
            user: req.user, 
            errorsJoin: [] ,
            errorsAdmin: errorsAdmin
        });
    }

    try {
        const updatedUser = await db.updateAdmin(req.user.id);    

        res.render('dashboard', { 
            user: updatedUser, 
            errorsJoin: [], 
            errorsAdmin: []
        });
    } catch (error) {
        console.error('Error updating membership status:', error);
        res.status(500).send('Failed to update your membership. Nice one.');
    }
}

  async function deleteMessage(req, res) {
    
   
    try {
        const messageId = req.params.id;

       
        await db.deleteMessage(messageId);
      

        res.redirect('/');  

    } catch (error) {
        console.error("Error deleting message:", error);
        res.status(500).send("Error deleting message");
    }
};
 


module.exports = {
    getMessages,
    getDashboard,
    signUpGet,
    createUser,
    addMessage,
    join,
    adminEdit,
    deleteMessage
};