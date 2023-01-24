const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'mydatabase';

// Collection Name
const collectionName = 'mycollection';

// Documents to be inserted
const documents = [
    { name: "John", age: 30 },
    { name: "Mike", age: 25 },
    { name: "Amy", age: 35 }
];

async function insertDocuments() {
    try {
        const client = await MongoClient.connect(url);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.insertMany(documents);
        console.log(`Inserted ${result.insertedCount} documents into the collection`);
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
}

insertDocuments();
