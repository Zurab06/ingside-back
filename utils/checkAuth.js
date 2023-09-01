import jwt from "jsonwebtoken";
import { secretKey } from "../secret.mjs";

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

    if (token) {
        try {
            const decoded = jwt.verify(token, secretKey)
            req.userId = decoded._id
            console.log(req.userId);
            next()
        }
        
        catch (error) {
            return res.status(403).json({
                message: 'нет доступа у'
            })
        }
    }
    else {
        return res.status(403).json({
            message: 'нет доступа'
        })
    }
}