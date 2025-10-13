import { MongoClient } from "mongodb"; // Import MongoClient from the official MongoDB package

// Custom MongoDB utility module
export const Mongo = {
  // Async function to connect to MongoDB
  async connect({ mongoConnectionString, mongoDbName }) {
    try {
      // Create MongoDB client instance using the connection string
      const client = new MongoClient(mongoConnectionString);
      
      // Connect to MongoDB cluster
      await client.connect();

      // Select the target database
      const db = client.db(mongoDbName);

      // Store references to client and database for later use
      this.client = client;
      this.db = db;

      // Return a success message
      return "Connected to mongo!";
    } catch (error) {
      // Return an error object if the connection fails
      return { text: "Error during mongo connection!", error };
    }
  },
};
