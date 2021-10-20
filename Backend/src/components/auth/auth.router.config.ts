import { CommonRoutesConfig } from '../../routers/common.routes.config'
import authController from './controller'
import authMiddleware from '../../../middleware/auth.middleware'
import express from 'express'
import bodyValidationMiddleware from '../../../middleware/body.validation.middleware'
import { body } from 'express-validator'
import jwtMiddleware from '../../../middleware/jwt.middleware'

export class AuthRouters extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'AuthRouters')
    }
    configureRoutes(): express.Application {
        this.app.post(`/auth`, [
            body('email').isEmail(),
            body('password').isString(),
            bodyValidationMiddleware.verifyBodyFieldsErrors,
            authMiddleware.verifityUserPassword,
            authController.createJWT,
        ]);

        this.app.post(`/auth/refresh-token`, [
            jwtMiddleware.validJWTNeeded,
            jwtMiddleware.verifyRefreshBodyField,
            jwtMiddleware.validRefreshNeeded,
            authController.createJWT, 

        ])
        return this.app
    }
}
