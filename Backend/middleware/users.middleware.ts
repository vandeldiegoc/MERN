import express from 'express'
import UserService from '../src/components/user/services'
import debug from 'debug'

const log: debug.IDebugger = debug('app:users-conntroller')
class UserMiddlere {
    
    async validateRequiredUserBodyFields(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if (req.body && req.body.email && req.body.password) {
            next()
        } else{
            res.status(400).send({
               error: 'Missing required fields email and password'
            })
        }
    }

    async validateSameEmailBelongToUser(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const user = await UserService.readById(req.body.email)
        if (user && req.body.email === req.params.Id)
        next()
        else {
            res.status(400).send({
                error: 'invalid email'
            })
        }
    }

    async validateSameEmailDoesntExist(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const user = await UserService.getUserByEmail(req.body.email);
        if (user) {
            res.status(400).send({ error: `User email already exists` });
        } else {
            next();
        }
    }

    validatePathEmail = async(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        if (req.body.email){
            log('Validation email', req.body.email)
            this.validateSameEmailBelongToUser(req, res, next) 
        } else {
            next()
        }      
    }

    async validateUserExists(req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const user = await UserService.readById(req.params.userId);
        if (user) {
            next();
        } else {
            res.status(404).send({error: `User ${req.params.userId} not found`});
        }
    }
 

    async extractUserId(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        req.body.id = req.params.userId;
        next();
    }
}

export default new UserMiddlere()