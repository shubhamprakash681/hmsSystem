import app from "./app.js";
import dotenv from 'dotenv';


// config
dotenv.config();
const PORT = process.env.PORT;

// database connection
import connectDatabase from "./config/database.js";
connectDatabase();


const server = app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});