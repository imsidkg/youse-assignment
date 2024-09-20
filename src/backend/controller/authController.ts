import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, password });
    await user.save();

    const token = jwt.sign(
      { user: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error signing up", error });
  }
};

export const login  = async(req : Request , res : Response) => {
    try {
        const {email , password} = req.body;
        const user = await User.findOne({email});
        if (!user || !(await user.password === password)) {
            return res.status(401).json({ message: 'Invalid credentials' });
          }
    }
}
