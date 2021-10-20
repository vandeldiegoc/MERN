import express from "express";
import debug from "debug";
import UserService from "./services"
import argon2 from 'argon2'
import bcrypt from "bcrypt"

const saltround = 10
const log: debug.IDebugger = debug('app:users-controller')
class userController{
    async listUser(req: express.Request, res: express.Response) {
        const user = await UserService.list(100, 0)
        res.status(200).send(user)
    }
    
    async createUser(req: express.Request, res: express.Response) {
        try {
            req.body.password = await argon2.hash(req.body.password)
        } catch {
            console.log('Error');
        }
    
        /* const salt = crypto.randomBytes(16).toString('base64');
        console.log(salt)

        let hash = crypto.createHmac('sha512',salt)
                                    .update(req.body.password)
                                    .digest("base64");
        req.body.password = salt + "$" + hash; */
        //req.body.password = await argon2.hash(req.body.password)
        const userId = await UserService.create(req.body);
        res.status(201).send({ id: userId });
    }


    async put(req: express.Request, res: express.Response) {
        req.body.password = await bcrypt.hash(req.body.password, saltround,(error:any , hash: string) => {

        
            if(error) {
                console.log("not")
                } 
           })
        log(await UserService.putById(req.body.id, req.body))
        res.status(204).send()
    }

}

export default new userController()