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
    hello <%= text %>
</body>
```

