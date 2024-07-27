import mongoose from 'mongoose';

const connectDb = async ( MONGODB_URI, MONGODB_NAME )=>{
    try {
        console.log("Connecting...")
        await mongoose.connect( MONGODB_URI, {
            dbName: MONGODB_NAME
        })
        console.log("Connected to database")
        
    } catch (error) {
        console.log(error.message);
    }
}

export default connectDb;