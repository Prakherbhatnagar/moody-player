const express= require('express');
const songRoutes=require('./routes/song.routes')
const cors=require('cors');


app=express(); //server create
app.use(cors());
app.use(express.json());

app.use('/',songRoutes)



module.exports=app;