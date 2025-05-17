const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName: String,
  email: String, 
  username: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ['admin', 'teacher', 'student', 'parent'],
    default: 'student'
  },
  class: String,    
  subject: String,  
  addedBy: String   
});

module.exports = mongoose.model('User', UserSchema);
