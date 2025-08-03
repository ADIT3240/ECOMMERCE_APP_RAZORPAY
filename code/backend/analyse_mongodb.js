// MongoDB Analysis Script for 'newcommerce' database
// Run this script with: node analyse_mongodb.js

import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017/newcommerce';

async function analyseDatabase() {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db();
    const collections = await db.listCollections().toArray();
    console.log(`Collections in 'newcommerce':`);
    collections.forEach((col, i) => console.log(`${i + 1}. ${col.name}`));

    for (const col of collections) {
      const collection = db.collection(col.name);
      const count = await collection.countDocuments();
      const sample = await collection.find().limit(3).toArray();
      const indexes = await collection.indexes();
      console.log(`\n--- Collection: ${col.name} ---`);
      console.log(`Document count: ${count}`);
      console.log(`Indexes:`, indexes);
      if (sample.length > 0) {
        console.log('Sample documents:');
        sample.forEach((doc, idx) => console.log(` ${idx + 1}:`, JSON.stringify(doc, null, 2)));
      } else {
        console.log('No documents found.');
      }
    }
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  } finally {
    await client.close();
  }
}

analyseDatabase();

