 

const { Client } = require("pg");

const SQLCategories = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE,
    membership_status VARCHAR(255) NOT NULL DEFAULT 'regular'

);

INSERT INTO users (name, last_name, username, password, is_admin, membership_status) 
VALUES
  ('Frontend', 'Developer', 'frontend_dev', 'password1', FALSE, 'regular'),
  ('Backend', 'Developer', 'backend_dev', 'password2', FALSE, 'regular'),
  ('Fullstack', 'Developer', 'fullstack_dev', 'password3', FALSE, 'regular'),
  ('DevOps', 'Engineer', 'devops_eng', 'password4', FALSE, 'regular');
`;

const SQLTools = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(255) NOT NULL,
  timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  text TEXT NOT NULL,
  user_id INTEGER REFERENCES users(id)
);

INSERT INTO messages (title, timestamp, text, user_id) 
VALUES
    ('Welcome to the Members Only Forum', CURRENT_TIMESTAMP, 'This is the first message in our forum. Feel free to share your thoughts and ideas!', 1),
    ('New Features Coming Soon', CURRENT_TIMESTAMP, 'We are excited to announce that new features will be added to the forum soon. Stay tuned for updates!', 2),
    ('Community Guidelines', CURRENT_TIMESTAMP, 'Please remember to follow our community guidelines to ensure a positive and respectful environment for everyone.', 3),
    ('Introduce Yourself', CURRENT_TIMESTAMP, 'Feel free to introduce yourself to the community! Share a bit about your interests and what you hope to gain from being a member.', 4);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
   connectionString: "postgresql://marijaavramovic:@localhost:5432/members_only"
  });
  await client.connect();
  await client.query(SQLCategories);
  await client.query(SQLTools);
  await client.end();
  console.log("done");
}

main();

//  connectionString: process.argv[2] 