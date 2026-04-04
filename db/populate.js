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
  ('Nikola', 'Tesla', 'tesla', 'acpower', TRUE, 'member'),
  ('Albert', 'Einstein', 'einstein', 'relativity', FALSE, 'member'),
  ('Marie', 'Curie', 'curie', 'radiation', FALSE, 'member');
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
  -- Same title, different perspectives
  ('The Future of Energy', CURRENT_TIMESTAMP, 'I believe wireless transmission of energy will change the world. Imagine power delivered without cables.', 1),
  ('The Future of Energy', CURRENT_TIMESTAMP, 'Energy and matter are deeply connected. Understanding their relationship will define future innovations.', 2),

  -- Unique messages
  ('On Curiosity', CURRENT_TIMESTAMP, 'Nothing in life is to be feared, it is only to be understood. Now is the time to understand more.', 3),
  ('Innovation and Imagination', CURRENT_TIMESTAMP, 'If you want to find the secrets of the universe, think in terms of energy, frequency, and vibration.', 1),
  ('Space and Time', CURRENT_TIMESTAMP, 'Time is relative. The faster you move, the slower it flows for you compared to others.', 2);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
     connectionString: process.argv[2]
  });

   // or use: "postgresql://marijaavramovic:@localhost:5432/members_only"

  await client.connect();
  await client.query(SQLCategories);
  await client.query(SQLTools);
  await client.end();
  console.log("done");
}

main();