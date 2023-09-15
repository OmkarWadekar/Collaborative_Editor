import mongoose from 'mongoose';

// mongoose.
mongoose.set('strictQuery', false);
const Connection = async (username = 'omkar08', password = 'omkar08') => {
    // const URL = `mongodb+srv://${username}:${password}@cluster0.rpkjsvt.mongodb.net/?retryWrites=true&w=majority`;
    const URL = `mongodb+srv://${username}:${password}@cluster0.jofczjc.mongodb.net/?retryWrites=true&w=majority`;
    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting with the database ', error);
    }
}

export default Connection;