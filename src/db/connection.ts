import { Pool } from "pg";

const connection = new Pool({
  user: "matheusfbio",
  password: "12345",
  host: "localhost",
  port: 5433,
  database: "crud-user",
});

export default connection;
