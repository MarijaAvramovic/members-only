const { Pool } = require("pg");

 
module.exports = new Pool({
  host: "localhost",
  user: "marijaavramovic",
  database: "members_only",
  password: "",
  port: 5432
});

 
// module.exports = new Pool({
//   connectionString: "postgresql://marijaavramovic:@localhost:4441/members_only"
// });