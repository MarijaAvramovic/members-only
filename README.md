# members-only


In this project includes an exclusive clubhouse app where members can write anonymous posts. Inside the clubhouse, members can see who the author of a post is, but outside they can only see the story and wonder who wrote it.

Anyone who comes to the site is able to see a list of all messages, with the author’s name hidden. Users can sign-up and create messages, but ONLY users that are members are able to see the author and date of each message. Admin user is able to see everything and also has the ability to delete messages.

The main purpose is to use the authentication skills and practicing PostgreSQL database skills.

I have 2 tables 
1. users with full-names (first and last), usernames (used email for this), passwords and membership-status. Users are able to create messages that have a title, a timestamp and some text. 
2. messages: title, a timestamp and some text. It keeps track of who created each message.

About sign-up form: sanitize and validate the form fields and secure the passwords with bcrypt. Has confirmPassword field to validate it using express-validator.

When users sign up they automatically get access to add new msg option. However membership status is not letting them view who wrote other msgs.

On dashboard page members can “join the club” by entering a secret passcode - "401". App will update their membership status and they will be able to see who wrote other msgs.

The login-form is using passport.js Local Strategy.
When a user is logged in on Home page user can add new msg - (only present if user's logged in!). 

All messages are on the home page, but the author and date of the messages are visibe to other club-members only.

User has the ability to delete messages only is is admin, users who have admin == true can see the delete-button and delete messages. On dashboard page mark a user as an ‘admin’ with another secret pass-code (admin).


Obviously this is a silly little app, but the things you are practicing (creating and authenticating users and giving users different abilities and permissions) are things that will be very useful to you!
When you’re satisfied with your work, deploy your project on your chosen PaaS (list of PaaS providers from the Deployment lesson) and share it below!
