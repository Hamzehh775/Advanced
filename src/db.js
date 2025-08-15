
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Client } = pkg;

export function getClient() {
  return new Client({
    host: process.env.PGHOST || "localhost",
    user: process.env.PGUSER || "postgres",
    password: process.env.PGPASSWORD || "",
    database: process.env.PGDATABASE || "admin_dashboard",
    port: Number(process.env.PGPORT || 5432),
  });
}
