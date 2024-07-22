const { MongoClient } = require('mongodb');

const connectDB = async () => {
    try {
        const url = 'mongodb+srv://naveedkasadu:Dw5vlcbF2qYQqxk7@cluster0.ibcgjfr.mongodb.net/';
        //"mongodb://localhost:27017/EventSystem"
        const client = new MongoClient(url);
        await client.connect();
        const db = client.db("EventSystem");
        console.log('MongoDB connected successfully');
        return db;
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;