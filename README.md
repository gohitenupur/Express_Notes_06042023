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
    // or
    res.status(200).send('ching chong');
    or
    res.status(200).json({message:"chong ching")}
    res.json() sends a default success code as we eliminated the status request
})

app.listen(3000);
```

**NOTE- JSON.stringify() && JSON.parse(), convert from obj=>json string & from json string=>obj
