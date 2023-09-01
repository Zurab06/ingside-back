import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { registerValidator } from "./validations/validations.js";
import { validationResult } from "express-validator";
import UserModel from "./models/User.model.js"
import bcrypt from 'bcrypt'
import { secretKey } from "./secret.mjs";
import checkAuth from "./utils/checkAuth.js";
import * as UserController from "./controllers/UserController.js";

const app = express()
app.use(express.json())

app.get('/auth/me', checkAuth,UserController.getMe)
app.post('/auth/login',UserController.login)
app.post('/auth/register', registerValidator,UserController.register)


mongoose.connect('mongodb+srv://gaunt0066:Panzerkampf06@cluster0.6m4r7dq.mongodb.net/ingside?retryWrites=true&w=majority').then(() => {
    console.log('mongo connected');
}).catch((err) => { console.log(err, 'mongo error') })

app.listen(4444, (req, res) => {

    console.log('server has been started');

})