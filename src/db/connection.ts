import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL || "postgresql://matheusfbio:12345@localhost:5433/crud-user";

const connection = new Pool({
  connectionString,
});

export default connection;
