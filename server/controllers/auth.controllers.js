const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// create json web token
const createToken = (id) => {
  return jwt.sign({id}, 'net ninja secret', {
    expiresIn: '1h'
  });
};


exports.register = async (req, res) => {
  try {
    const {username, email, password, role} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({username, email, password: hashedPassword, role});
    await user.save();
    res.status(201).json({message: 'User registered successfully'});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

exports.login = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (!user) {
      return res.status(401).json({error: 'Invalid email or password'});
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({error: 'Invalid email or password'});
    }
    const token = createToken(user._id);

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};
