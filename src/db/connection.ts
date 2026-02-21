import "dotenv/config";
import postgres from "postgres";

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}`;

export const sql = postgres(URL, {
  ssl: {
    require: true,
  },
});

// const useSsl =
//   (process.env.PGSSLMODE &&
//     process.env.PGSSLMODE.toLowerCase() === "require") ||
//   (connectionString && connectionString.includes("sslmode=require"));

// const sslConfig = useSsl ? { rejectUnauthorized: false } : undefined;

// let pool: Pool;
// if (connectionString) {
//   pool = new Pool({ connectionString, ssl: sslConfig });
// } else {
//   // Ensure environment values are strings / properly typed
//   const host = process.env.PGHOST;
//   const database = process.env.PGDATABASE;
//   const user = process.env.PGUSER;
//   const password =
//     process.env.PGPASSWORD !== undefined
//       ? String(process.env.PGPASSWORD)
//       : undefined;
//   const port = process.env.PGPORT
//     ? parseInt(process.env.PGPORT, 10)
//     : undefined;

//   pool = new Pool({ host, database, user, password, port, ssl: sslConfig });
// }
