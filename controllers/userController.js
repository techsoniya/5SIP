const User = require('../models/user');

exports.registerUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    const authToken = generateAuthToken();
    newUser.authToken = authToken;
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', authToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      throw new Error('Invalid email or password');
    }
    const authToken = generateAuthToken();
    user.authToken = authToken;
    await user.save();
    res.status(200).json({ message: 'Login successful', authToken });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

function generateAuthToken() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
