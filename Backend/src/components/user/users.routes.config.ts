import {CommonRoutesConfig} from '../../routers/common.routes.config';
import UsersController from './controller';
import AuthMiddleware from '../../../middleware/auth.middleware';
import UsersMiddleware from '../../../middleware/users.middleware';
import express from 'express';
import { body } from 'express-validator';
import BodyValidationMiddleware from '../../../middleware/body.validation.middleware';

export class UserRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UserRoutes')
    }

    configureRoutes(): express.Application {
        this.app.route(`/users`)
            .get(UsersController.listUser)
            .post(
                body('email').isEmail(),
                body('password')
                    .isLength({min: 5 })
                    .withMessage("Password must be +5 characters"),
                UsersMiddleware.validateRequiredUserBodyFields,
                UsersMiddleware.validateSameEmailDoesntExist,
                UsersController.createUser);

        /* this.app.route(`/users`)
            .get((req: express.Request, res: express.Response) => {
                res.status(200).send(`List of users`);
            })
            .post((req: express.Request, res: express.Response) => {
                res.status(200).send(`Post to users`);
            });
        */

        
       /*  this.app.route(`/users`)
            .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
                // This middleware function runs before any request to /users/:userId
                // It doesn't accomplish anything just yet---it simply passes control to the next applicable function below using next()
                next();
            })
            UsersController.listUser */

        this.app.put(`/users/:userId`, [
            body('email').isEmail(),
            body('password')
                .isLength({ min: 5 })
                .withMessage('Must include password (5+ characters)'),
            body('firstName').isString(),
            body('lastName').isString(),
            body('permissionFlags').isInt(),
            BodyValidationMiddleware.verifyBodyFieldsErrors,

            /*
            UsersMiddleware.validateSameEmailBelongToSameUser,
            UsersMiddleware.userCantChangePermission,
            permissionMiddleware.permissionFlagRequired(
                PermissionFlag.PAID_PERMISSION 
            )*/
            UsersController.put,
        ]);
        return this.app
    }
}   