import mongoose from 'mongoose';

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URL  /**, {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true}**/)
    .then((data) => {
        console.log(`MongoDb connected with server: ${data.connection.host}`);
    })
    .catch((error) => {
        console.log(error);
    })
}

export default connectDatabase;