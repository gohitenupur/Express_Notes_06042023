const express =  require('express');
const app = express();

app.set('view engine', 'ejs')
app.use(logger)
const userRouter = require('./Routes/users');

app.use('/users',userRouter)


function logger(req,res,next){
    console.log(req.originalUrl);
    next();
}
app.listen(3000);