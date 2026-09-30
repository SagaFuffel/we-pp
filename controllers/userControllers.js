const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const user = require("../models/userModel");


//generate token with exp.time
const generateToken = (_id) => {
    return JWT.sign({_id}, process.env.secret, {
        expiresIn: "10d",
    });
}

const signUpUser = async (req, res) => {
    const {name, email, password, phone_number, gender, date_of_birth, membership_status,} = req.body;

    try {
        if (!name || !email || !password || !phone_number || !gender || !date_of_birth || !membership_status);
        {
            res.status(400);
            throw new Error("Please fill all sections.");
        }

        const alreadyExists = await User.findOne({email});

        if (alreadyExists) {
            res.status(400);
            throw new Error("already exists");
        
        }

        //hash
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        
        //create with hash
        const user = await User.create({
            name, email, password:hashed, phone_number, gender, date_of_birth, membership_status,
        });

        if (user){
            const token = generateToken(user._id);
            res.status(201).json({email, token})

        } else {
            res.status(400);
            throw new Error("Invalid user data");
        }
    } catch (error) {
        res.status(400).json({error:error.message});
    }

};


//login
const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = generateToken(user._id);
            res.status(200).json({email,token});
        } else {
            res.status(400);
            throw new Error("Invalid credentials")
        }
    } catch (error) {
        res.status(400).json({error:error.message});
    }
};


module.exports = {
    signUpUser,
    loginUser,
};