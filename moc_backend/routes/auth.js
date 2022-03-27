const router = require('express').Router();
const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const {registerValidation, loginValidation} = require('../validation');

router.post('/register', async (req, res) => {
  //Validate data before add it
  const {error} = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if user is already in database
  const emailExist = await User.findOne({email: req.body.email});
  if (emailExist) return res.status(400).send('Email already exists!!');

  //Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/login', async (req, res) => {

  //Validate data before add it
  const {error} = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if email exists
  const user = await User.findOne({email: req.body.email}).select('+password');
  if (!user) return res.status(400).send('Email does not exists!!');

  //Password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password)
  if (!validPass) return res.status(400).send('Invalid password!!')

  var user_data = await User.find({_id: user.id}, {_id: 0,date: 0,__v: 0});

  //Create and assign a token
  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send({success: true, token: token, data: user_data});

});

router.post('/logout', async (req,res) => {
  res.send({success: true, message: "Logout"})
})

module.exports = router;
