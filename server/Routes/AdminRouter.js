import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import mongoose from "mongoose";
import User from '../utilis/userModel.js';

//  const User2 = mongoose.model("USER")


const router = express.Router()

router.post("/signup", (request, response) => {
    // hash the password
    bcrypt
      .hash(request.body.password, 10)
      .then((hashedPassword) => {
        // create a new user instance and collect the data
        
        const user = new User({
          email: request.body.email,
          password: hashedPassword,
        });
  
        // save the new user
        user
          .save()
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
      })
      // catch error if the password hash isn't successful
      .catch((e) => {
        response.status(500).send({
          message: "Password was not hashed successfully",
          e,
        });
      });
  });

  router.post('/login', (req, resp) => {
    const { email, password } = req.body;
  
    User.findOne({ email: email })
      .then((user) => {
        if (!user) {
          return resp.status(404).send({
            message: "email not found",
          });
        }
  
        bcrypt.compare(password, user.password)
          .then((match) => {
            if (match) {
              const token = jwt.sign(
                {
                  _id: user.id,
                },
                "RANDOM" // Secret key
              );
              const { _id, email } = user;
              resp.status(200).json({ token, user: { _id, email } ,  LoginStatus: true,});
            } else {
              console.log("Password mismatch:", password, user.password);
              resp.status(400).send({
                message: "Passwords do not match",LoginStatus: false
              });
            }
          })
          .catch((error) => {
            console.error("Error comparing passwords:", error);
            resp.status(400).send({
              message: "Error comparing passwords",
              error,
            });
          });
      })
      .catch((e) => {
        console.error("Email not found:", e);
        resp.status(404).send({
          message: "Email not found",
          e,
        });
      });
  });

export { router as adminRouter }