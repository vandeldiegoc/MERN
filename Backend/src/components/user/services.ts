import UsersDao from './DAO'

import {CRUD} from './crud.interface'
import { CreateUserDto, putUserDto } from './DTO'

class UserService implements CRUD {
    
    async create(resource: CreateUserDto) {
        return UsersDao.addUser(resource)
    }

    async list(limit: number, page: number) {
        return UsersDao.getUsers(limit, page)
    }

    async readById(id: string) {
        return UsersDao.getUserById(id)
    }

    async putById(id: string, resource: putUserDto): Promise<any> {
        return UsersDao.putUserById(id, resource)
    }

    async getUserByEmail(email: string) {
        return UsersDao.getUserByEmail(email);
    }

    async getUserByEmailWithPassword(email: string) {
        return UsersDao.getUserByEmailWithPassword(email)
    }

}

export default new UserService()