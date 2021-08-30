const express = require('express');
const router = express.Router();
const User = require('../schema/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser)
            return res.status(404).json({ message: "User doesn't exists." });
        const isCorrectPassword = await bcrypt.compare(password, existingUser.password);
        if (!isCorrectPassword)
            return res.status(404).json({ message: "Invalid credentials." });
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '1h' })
        return res.status(200).json({ result: existingUser, token });
    } catch (err) {
        res.status(500).json({ message: "Something Went Wrong." });
    }
})
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(404).json({ message: "Creadentials Already Exists" });
        const hashedPassword =await bcrypt.hash(password, 12);
        const result = await User.create({ name, email, password: hashedPassword });
        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '1h' });
        return res.status(200).json({ result ,token});
    } catch (err) {
        res.status(500).json({ message: "Something Went Wrong." });
    }
})
module.exports = router;
