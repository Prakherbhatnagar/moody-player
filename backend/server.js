require('dotenv').config();
const app=require('./src/App');
const connectDB=require('./src/db/db');

connectDB();

app.listen(3000,()=>{
    console.log("server on port 3000");
})