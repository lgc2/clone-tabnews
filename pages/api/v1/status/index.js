import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const dbInformation = await database.getDatabaseInformation();

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: dbInformation.version,
        max_connections: dbInformation.maxConnections,
        opened_connections: dbInformation.openedConnections,
      },
    },
  });
}

export default status;
