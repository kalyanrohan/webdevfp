const router = require('express').Router();
const User = require('../models/User');

// creating user
router.post('/', async(req, res)=> {
  try {
    const {name, email, password, picture} = req.body;
    console.log(req.body);
    const user = await User.create({name, email, password, picture});
    res.status(201).json(user);
  } catch (e) {
    let msg;
    if(e.code == 11000){
      msg = "User already exists"
    } else {
      msg = e.message;
    }
    console.log(e);
    res.status(400).json(msg)
  }
})

// updating username and password
router.put('/:id', async(req, res)=> {
  try {
    const user = await User.findbyId(request.user._id,);

    if (user) {
      user.name = req.body.name || user.name;

      const user = await user.save();

    }

    res.status(200).json(user);
  } catch (e) {
    console.log(e);
    res.status(400).json(e.message)
  }
} )

// login user

router.post('/login', async(req, res)=> {
  try {
    const {email, password} = req.body;
    const user = await User.findByCredentials(email, password);
    user.status = 'online';
    await user.save();
    res.status(200).json(user);
  } catch (e) {
      res.status(400).json(e.message)
  }
})


module.exports = router