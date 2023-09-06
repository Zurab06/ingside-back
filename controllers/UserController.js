import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import UserModel from "../models/User.model.js"
import bcrypt from 'bcrypt'
import { secretKey } from "../secret.mjs";


export const register = async (req, res) => {
    try {
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const doc = new UserModel({
            fullName: req.body.fullName,
            email: req.body.email,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash

        })
        const user = await doc.save()
        const token = jwt.sign({ _id: user._id }, 'secret123', { expiresIn: '30d' })
        const { passwordHash, ...userData } = user._doc
        res.json({ token, ...userData })
    } catch (error) {
        res.json(error)
    }

}
export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email })
        if (!user) {
            return res.status(404).json({ message: 'пользователь не найден' })
        }
        const isValidPass = bcrypt.compare(req.body.password, user._doc.passwordHash)
        if (!isValidPass) {
            return res.status(400).json({ message: 'неверный логин или пароль' })
        }

        const token = jwt.sign({
            _id: user._id,
        }, secretKey, { expiresIn: '30d' })
        const { passwordHash, ...userData } = user._doc
        res.json({ ...userData, token })
    } catch (error) {
        return res.status(500).json({ message: 'не удалось авторизоваться' })
    }
}
export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId)
        if (!user) {
            return res.status(404).json({
                message: 'пользователь не найден'
            })

        }
        const { passwordHash, ...userData } = user._doc
        res.json(userData)
    } catch (error) {
        res.status(400).json({
            message: 'ошибка доступа'
        })
    }

}