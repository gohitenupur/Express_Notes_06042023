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

router.post('/', (req,res)=>{
    res.send('user home post data');
})


router.route('/:id').get((req,res)=>{
    console.log(req.user)                   //used here to console log
    res.send(`get user with id ${req.params.id}`);
}).post((req,res)=>{
    res.send(`post user with id ${req.params.id}`);
}).delete((req,res)=>{
    res.send(`delete user with id ${req.params.id}`);
})


const users = [{name:'user1'}, {name:"user2"}]

router.param("id", (req,res,next,id)=>{
    req.user = users[id];                   // we added a property to the req object
    next();                                 //next() wil allow the application to proceed further
})



module.exports = router;

// we did not use the path /user, /user/new & /user/data here because router understands that it's common & there's no need to repeat it.