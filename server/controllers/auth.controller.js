const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Reclamation = require("../models/reclamation.model");

// create json web token
const createToken = (id) => {
  return jwt.sign({id}, 'net ninja secret', {
    expiresIn: '1800s'
  });
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
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
    const id = user._id
    const {username, role} = user;

    res.status(200).json({token, username, role, id});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

