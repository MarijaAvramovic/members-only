# members-only


In this project includes an exclusive clubhouse app where members can write anonymous posts. Inside the clubhouse, members can see who the author of a post is, but outside they can only see the story and wonder who wrote it.

The main purpose is to use the authentication skills and practicing PostgreSQL database skills.

I have 2 tables 
1. users with full-names (first and last), usernames (used email for this), passwords and membership-status. Users are able to create messages that have a title, a timestamp and some text. 
2. messages: title, a timestamp and some text. It keeps track of who created each message.

About sign-up form: sanitize and validate the form fields and secure the passwords with bcrypt. Has confirmPassword field to validate it using express-validator.

When users sign up they automatically get access to add new msg. However membership status is not letting them view who wrote other msgs.

What fun is a private club if just anyone can join? Add a page where members can “join the club” by entering a secret passcode. If they enter the passcode correctly then update their membership status.
Create a login-form using passport.js like we did in the last assignment.
When a user is logged in give them a link to “Create a new message” (but only show it if they’re logged in!). Create the new-message form.
Display all member messages on the home page, but only show the author and date of the messages to other club-members.
Add an optional field to the user model called Admin and then add the ability to delete messages, but only allow users who have admin == true to see the delete-button and delete messages. You’ll need to add a way to actually mark a user as an ‘admin’ so either add another secret pass-code page, or just put an “is admin” checkbox on the sign-up form.
By this point, anyone who comes to the site should be able to see a list of all messages, with the author’s name hidden. Users should be able to sign-up and create messages, but ONLY users that are members should be able to see the author and date of each message. Finally, you should have an Admin user that is able to see everything and also has the ability to delete messages. Obviously this is a silly little app, but the things you are practicing (creating and authenticating users and giving users different abilities and permissions) are things that will be very useful to you!
When you’re satisfied with your work, deploy your project on your chosen PaaS (list of PaaS providers from the Deployment lesson) and share it below!
