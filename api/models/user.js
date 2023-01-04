const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  age: {
    type: Number,
  },
  country: {
    type: String,
  },
  photo: {
    type: String,
  }
});

UserSchema.pre(
  'save',
  async function(next) {
    if (this.isModified('password')) this.password = await bcrypt.hash(this.password, 10);
    next();
  }
);

UserSchema.methods.isValidPassword = async function(password) {
  const user = this;
  console.log(password, user.password);
  const compare = await bcrypt.compare(password, user.password);
  console.log("COMPARE: ", compare);
  return compare;
}

module.exports = mongoose.model('User', UserSchema);
