const express=require('express')
const e=express();
const path = require('path')
const mainRouter=require('./routes/basic');
const PORT=process.env.PORT||3007;
e.set('view engine', 'ejs');
const HTML_DIR = path.join(__dirname, '/Public/')
e.use(express.static(HTML_DIR));
e.use(express.json());
e.use(mainRouter);
e.listen(PORT,()=>{
    console.log(`running on port ${PORT}`);
})