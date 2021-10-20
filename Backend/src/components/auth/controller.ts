import {Request, Response} from "express";
import jwt from "jsonwebtoken";
import debug from "debug";
import crypto from 'crypto'

const log: debug.IDebugger = debug('app:aunt-controller')

const jwtSecret = 'secr3tPass!23'
const tokenExpirationInSeconds = 36000


class AuthController {
    async createJWT(req: Request, res: Response) {
        try {
            const refreshId = req.body.userId + jwtSecret;
            const v = crypto.randomBytes(16)
            const salt = crypto.createSecretKey(v);
            const hash = crypto
                .createHmac('sha512', salt)
                .update(refreshId)
                .digest('base64');
            req.body.refreshKey = salt.export();
            const token = jwt.sign(req.body, jwtSecret, {
                expiresIn: tokenExpirationInSeconds,
            });
            return res
                .status(201)
                .send({ accessToken: token, refreshToken: hash });
        } catch (err) {
            console.log(err);
            return res.status(500).send();
        }
    }
}

export default new AuthController()