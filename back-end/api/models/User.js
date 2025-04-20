const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  user_id: {
    type: String,
    unique: true,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
  },
  password: {
    type: String,
    required: true
  }
});

// Hàm sinh 4 số ngẫu nhiên không trùng
async function generateUniqueUserId() {
  let userId;
  let isDuplicate = true;

  while (isDuplicate) {
    userId = Math.floor(1000 + Math.random() * 9000).toString(); // 4 số ngẫu nhiên từ 1000 đến 9999
    const existingUser = await mongoose.models.User.findOne({ user_id: userId });
    if (!existingUser) {
      isDuplicate = false;
    }
  }

  return userId;
}

// Middleware để mã hóa mật khẩu và sinh user_id
UserSchema.pre('save', async function (next) {
  try {
    // Tạo user_id nếu chưa có
    if (!this.user_id) {
      this.user_id = await generateUniqueUserId();
    }

    // Mã hóa mật khẩu nếu có thay đổi
    if (this.isModified('password')) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }

    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('User', UserSchema);
