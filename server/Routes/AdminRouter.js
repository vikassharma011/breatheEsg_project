import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import User from '../utilis/userModel.js';

const router = express.Router()

router.post("/signup", (request, response) => {
    // create a new user instance and collect the data
    const user = new User({
        email: request.body.email,
        password: request.body.password, // Store password directly (without hashing)
    });

    // save the new user
    user.save()
        // return success if the new user is added to the database successfully
        .then((result) => {
            response.status(201).send({
                message: "User Created Successfully",
                result,
            });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
            response.status(500).send({
                message: "Error creating user",
                error,
            });
        });
});

router.post('/login', (req, resp) => {
    const { email, password } = req.body;

    User.findOne({ email: email })
        .then((user) => {
            if (!user) {
                return resp.status(404).send({
                    message: "Email not found",
                });
            }

            if (user.password === password) { // Compare passwords directly (without hashing)
                const token = jwt.sign(
                    {
                        _id: user.id,
                    },
                    "RANDOM" // Secret key
                );
                const { _id, email } = user;
                resp.status(200).json({ token, user: { _id, email }, LoginStatus: true });
            } else {
                console.log("Password mismatch:", password, user.password);
                resp.status(400).send({
                    message: "Passwords do not match", LoginStatus: false
                });
            }
        })
        .catch((e) => {
            console.error("Email not found:", e);
            resp.status(404).send({
                message: "Email not found",
                e,
            });
        });
});

export { router as adminRouter };
