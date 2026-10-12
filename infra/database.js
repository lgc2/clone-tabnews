import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });

  try {
    await client.connect();
    const result = await client.query(queryObject);
    return result;
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

async function getDatabaseInformation() {
  const versionRes = await query("SHOW server_version;");
  const version = versionRes.rows[0].server_version;

  const maxConnRes = await query("SHOW max_connections;");
  const maxConnections = parseInt(maxConnRes.rows[0].max_connections, 10);

  const openedConnRes = await query({
    text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [process.env.POSTGRES_DB],
  });
  const openedConnections = openedConnRes.rows[0].count;

  return { version, maxConnections, openedConnections };
}

export default {
  query: query,
  getDatabaseInformation: getDatabaseInformation,
};
