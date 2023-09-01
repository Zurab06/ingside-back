import { body } from "express-validator";

export const registerValidator = [
    body('email', 'неверный формат почты').isEmail(),
    body('fullName','Имя не может быть короче 3 букв').isLength({ min: 3 }),
    body('password','пароль не может быть короче 5 и длиннее 10').isLength({ min: 5, max: 10 }),
    body('avatarUrl', 'неверная ссылка').optional().isURL()
]

export const loginValidator = [
    body('email','неверный формат почты').isEmail(),
    body('password','не меньше 5 знаков').isLength({min:5})
]

export const postValidator = [
body('title').isLength({min:2}).isString(),
body('text', "введите текст").isLength({min: 10},).isString(),
body('tags', 'укажите теги').optional().isString(),
body('imageUrl','неверная ссылка').optional().isString()
]