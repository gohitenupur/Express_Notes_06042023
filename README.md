# Express_Notes_06042023
Express Notes

<h2>Get started</h2>

```
//node should be pre installed
npm init
npm i express
npm install --save-dev nodemon

//add this too
"scripts": {
    "devtest": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },

//run the file
npm run devtest
```

<h3>Start express server</h3>

```
const express =  require('express');
const app = express();

app.get('/', (req, res) => {
    res.sendStatus(200);
    res.send('ching chong');
----------------------------------------------
    res.status(200).send('ching chong');
----------------------------------------------
    res.status(200).json({message:"chong ching")}
    res.json() sends a default success code as we eliminated the status request
----------------------------------------------
    res.download('index.js'); //can be used to send data to user that he can download, provide file path as argument
})

app.listen(3000);
```

**NOTE- JSON.stringify() && JSON.parse(), convert from obj=>json string & from json string=>obj**

```
npm i ejs//run in terminal to install view engine to facilitate rendering of html from server

app.set('view engine', 'ejs')  //outside app.get()

app.render('script') // by default create a folder views & have .ejs files in it(you dont have to specify path then)
```
**Looks like this**
```
const express =  require('express');
const app = express();

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('script', {text: "world"})
})

app.listen(3000);

-------------------------------------------------------
in script.ejs use like this
<body>
    hello <%= locals.text || 'default' %>   //locals is an object, now if text is passed in express file it will be rendered & if it's not present 'default' will be
</body>
```

<h2>Express Routing</h2>

```
const express =  require('express');
const app = express();

app.set('view engine', 'ejs')

const userRouter = require('./Routes/users');
app.use('/users',userRouter) //first argument is common path, i.e Any url that starts with /users add all of these routes to the end of it
app.listen(3000);
-----------------------------------------------------------------------------------------------------------------------------------------------------

//user file in routes folder

const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    res.send('user home');
})
router.get('/new', (req,res)=>{
    res.send('new user')
})
router.get('/data', (req,res)=>{
    res.send('user data')
})
--------------------------------------------------------
router.post('/', (req,res)=>{
    res.send('user home post data');
})
--------------------------------------------------------
router.get('/:id', (req,res)=>{         //any paramter after colon is dynamic & we can access it 
    
    res.send(`get user with id ${req.params.id}`);
})

module.exports = router;

// we did not use the path /user, /user/new & /user/data here because router understands that it's common & there's no need to repeat it.
```

<h3>Chaining get,post & other methods for a url in express</h3>

```
router.route('/:id').get((req,res)=>{
    res.send(`get user with id ${req.params.id}`);
}).post((req,res)=>{
    res.send(`post user with id ${req.params.id}`);
}).delete((req,res)=>{
    res.send(`delete user with id ${req.params.id}`);
})

Above code is replacement for code below
----------------------------------------------------------

router.get('/:id', (req,res)=>{
    
    res.send(`get user with id ${req.params.id}`);
})
router.post('/:id', (req,res)=>{
    
    res.send(`post user with id ${req.params.id}`);
})
router.delete('/:id', (req,res)=>{
    
    res.send(`delete user with id ${req.params.id}`);
})
```

<h3>Middleware runs before rest of the code in the file</h3>

```
router.route('/:id').get((req,res)=>{
    console.log(req.user)                   //used here to console log
    res.send(`get user with id ${req.params.id}`);
}).post((req,res)=>{
    res.send(`post user with id ${req.params.id}`);
}).delete((req,res)=>{
    res.send(`delete user with id ${req.params.id}`);
})


const users = [{name:'user1'}, {name:"user2"}]
-------------------------------------------------------------
router.param("id", (req,res,next,id)=>{
    req.user = users[id];                   // we added a property to the req object
    next();                                 //next() wil allow the application to proceed further
})
```

<h3>Another example</h3>
Note: This middleware won't run first, maybe because it's a function

```
app.use(logger)

function logger(req,res,next){
    console.log(req.originalUrl);
    next();
}
----------------------------------------

router.get('/', logger, (req,res)=>{
    res.send('user home');
})
```

<h3>Middleware for static page</h3>

```
//public folder m jo .html file h that will be rendered when this is called
app.use(express.static("public"))
```

<h3>Form submission</h3>

```
<!DOCTYPE html>
<html>
  <head>
    <title>My Form</title>
  </head>
  <body>
    <h1>My Form</h1>
    <form method="POST" action="">
      <label>
        Name:
        <input type="text" value=<% locals.name%> />
      </label><br />
      <button type="submit">Submit</button>
    </form>
  </body>
</html>
```
