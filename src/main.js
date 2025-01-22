const { Client, Databases } = require('node-appwrite');

module.exports = async function (req, res) {
  // Load environment variables
  const endpoint = process.env.APPWRITE_ENDPOINT;
  const projectId = process.env.APPWRITE_PROJECT_ID;
  const apiKey = process.env.APPWRITE_API_KEY;
  const databaseId = process.env.APPWRITE_DATABASE_ID;
  const collectionId = process.env.APPWRITE_USERS_COLLECTION_ID; // Ensure this is the users collection

  // Check required environment variables
  if (!endpoint || !projectId || !apiKey || !databaseId || !collectionId) {
    return res.json({ error: "Missing required environment variables." }, 400);
  }

  // Initialize Appwrite client
  const client = new Client();
  const databases = new Databases(client);

  client
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setKey(apiKey);

  try {
    // Fetch all documents (users) from the collection
    const documents = await databases.listDocuments(databaseId, collectionId);

    // Return all user data
    return res.json({ users: documents.documents });
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    return res.json({ error: error.message }, 500);
  }
};
