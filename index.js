const path=require('path');
const express=require('express');
const mongoose=require("mongoose");
const userRoute=require("./routes/user")
const cookieParser=require("cookie-parser");
const { checkforAuthenticationCookie } = require('./middlewares/authentication');
const app= express();
const PORT=8000;


mongoose.connect('mongodb://localhost:27017/blogInd').then(e=> console.log('Mongo DB connected'));

//middleware
app.use(express.urlencoded({ extended:false }));
app.set('view engine','ejs');
app.set('views',path.resolve("./views"));
app.use(cookieParser());
app.use(checkforAuthenticationCookie("token"));

//routes
app.get('/',(req,res)=>{
    res.render("home",{
        user: req.user,
    });
});

app.use('/user',userRoute);




app.listen(PORT,()=>console.log(`Server is started at PORT:${PORT}`));