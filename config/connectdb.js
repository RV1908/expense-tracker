const mongoose = require('mongoose')

const connectDB = async (DATABASE_URL) => {
    try {
        const DB_OPTIONS = {
            dbName: "ExpenceTracker"
        }
        await mongoose.connect(DATABASE_URL, DB_OPTIONS)
        console.log('connected to MongoDb successfully....')
    } catch (error) {
        console.log("error by db connection",error.message);
    }
}


module.exports = connectDB;
