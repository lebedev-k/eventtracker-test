import { MongoClient } from "mongodb";

class Database {
  readonly client = new MongoClient(process.env.MONGO_CONNECTION_STRING);

  /**
   * Connect to mongodb database
   */
  init() {
    return this.client.connect();
  }
}

/**
 * thin wrapper around {@link MongoClient}
 */
export const database = new Database();
