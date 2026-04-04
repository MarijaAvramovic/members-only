const { configDotenv } = require("dotenv");
const { Pool } = require("pg");

 
module.exports = new Pool({
 connectionString: process.env.DATABASE_URL
});

 
// module.exports = new Pool({
//   connectionString: "postgresql://marijaavramovic:@localhost:4441/members_only"
// });