const { CosmosClient } = require("@azure/cosmos");
require("dotenv").config();

const client = new CosmosClient({
  endpoint: process.env.COSMOS_DB_URI,
  key: process.env.COSMOS_DB_KEY,
});

const database = client.database(process.env.COSMOS_DB_NAME);
const container = database.container(process.env.COSMOS_DB_CONTAINER);

async function getUserData(userId) {
  const querySpec = {
    query: "SELECT * FROM c WHERE c.userId = @userId",
    parameters: [{ name: "@userId", value: userId }],
  };

  const { resources: items } = await container.items
    .query(querySpec)
    .fetchAll();

  const profile = items.find((item) => item.type === "profile");
  const dog = items.find((item) => item.type === "dog");
  const journals = items
    .filter((item) => item.type === "journal")
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return {
    profile,
    dog,
    journals,
  };
}

module.exports = getUserData;

