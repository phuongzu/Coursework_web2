const User = require('../models/User');

const authenticateUser = async (req, res, next) => {
  const { username, user_id } = req.body;

  if (!username || !user_id) {
    return res.status(400).json({ message: 'Username and user_id are required' });
  }

  try {
    // Tìm người dùng theo username và user_id
    const user = await User.findOne({ username, user_id });

    if (!user) {
      return res.status(400).json({ message: 'Invalid username or user_id' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Authentication error:', err);
    res.status(500).json({ message: 'Server error', error: err });
  }
};

module.exports = authenticateUser;
