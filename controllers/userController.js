const { users } = require("../models/userModel");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string().min(3).required(), // Username must have at least 3 characters
  password: Joi.string().min(6).required(), // Password must have at least 6 characters
  email: Joi.string().email().required(), // Must be a valid email format
});

exports.register = (req, res) => {
  //checking request body data based on registerSchema
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { username, password, email } = req.body;

  // Check if user already exists
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Create a new user
  const newUser = {
    id: users.length + 1,
    username,
    password,
    email,
  };

  // Add user to the array
  users.push(newUser); 
  console.log(users);
  res
    .status(201)
    .json({ message: "User registered successfully", user: newUser });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  //Find username and password in array
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate token
  const token = jwt.sign({ id: user.id, username: user.username }, "secret", {
    expiresIn: "1h",
  });

  res.json({ message: "Login successful", token });
};

exports.profile = (req, res) => {
  const user = users.find((u) => u.id === req.userId);
  
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ message: "User profile retrieved", user });
};
