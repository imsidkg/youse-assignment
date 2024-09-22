import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
export const signup = async (req: Request, res: Response) => {
  try {
    console.log('Signup request body:', req.body);
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = new User({ username, email, password });
    await user.save();

    const token = jwt.sign(
      { user: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );
    res.status(201).json({ token });
  } catch (error:any) {
    console.error("Signup error:", error);
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({ message: "Validation error", errors: validationErrors });
    }
    if (error.code === 11000) {
      return res.status(400).json({ message: "Username or email already exists" });
    }
    res.status(500).json({ message: "Error signing up", error: error.toString() });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    // Verify user credentials...
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Check password...
    if (!await bcrypt.compare(req.body.password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );
    
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error during login' });
  }
};