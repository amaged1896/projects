import { userModel } from "../../../databases/models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = new userModel({ username, email: email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "success" });
};

const signin = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user || (!await bcrypt.compare(password, user.password))) return res.status(400).json({ message: "incorrect email or password" });
    user.password = undefined;
    let token = jwt.sign({ user }, '@Maged');
    res.status(200).json({ message: "success", token });
};


// const updateUser = async (req, res, next) => {
//     const { username, email, password } = req.body;
//     const user = await userModel.findOneAndUpdate({ email }, { username, password });
//     if (!user) return res.status(400).json({ message: "User does not exist" });
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) return res.status(400).json({ message: "Invalid password" });
//     res.status(200).json({ message: "success", user });
// };

// const deleteUser = async (req, res, next) => {
//     const { email } = req.body;
//     const user = await userModel.findOneAndDelete({ email });
//     if (!user) return res.status(400).json({ message: "User does not exist" });
//     res.status(200).json({ message: "success" });
// };

export {
    signup,
    signin,
};
