import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
    res.send("api route is working");
};

export const updateUser = async (req, res, next) => {
    // console.log("0.0 req.body = ",req.body);
    // console.log("0.",req.params);
    if (req.user.id !== req.params.id) {
        // console.log('1. error in finding id');
        return next(errorHandler(401, "You can only update your own account"));
    }
    // else {
    //     console.log('1. finding id success');
    // }
    try {
        if (req.body.password) {
            // console.log("2. password is ", req.body.password);
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar,
                },
            },
            { new: true }
        );
        // console.log("3. updated user is ", updateUser)
        const { password: pass, ...rest } = updatedUser._doc;
        return res.status(200).json(rest);
    } catch (err) {
        // console.log("1.1 the message in catch block is ", err.message);
        next(err);
    }
};
