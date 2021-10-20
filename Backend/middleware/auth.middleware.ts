import { Request, Response, NextFunction } from "express"
import UserService from '../src/components/user/services'
import argon2 from 'argon2'


class AuthMiddleware {

    async verifityUserPassword(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const user: any = await UserService.getUserByEmailWithPassword(
            req.body.email
        )

        if (user) {
            const passwordHash = user.password
            if (await argon2.verify(passwordHash, req.body.password)) {
                req.body = {
                    userId: user._id,
                    email: user.email,
                    permissionFlags: user.permissionFlags,
                }
                return next()
            }
        }
        else {
            res.status(400).send({Error: 'user does not match the with user email'})
        }
    res.status(400).send({Error: 'password does not match the with user email'})
    } 
} 
export default new AuthMiddleware()