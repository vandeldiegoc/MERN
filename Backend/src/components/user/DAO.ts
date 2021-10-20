import debug from 'debug';
import MongooseService from '../../services/mongodb/ConnetMongo'
import { CreateUserDto, putUserDto, PatchUserDto } from './DTO';
import  generate from 'shortid'

const log: debug.IDebugger = debug('app:in-memory-dao');


class UsersDao {

    Schema = MongooseService.getMongoose().Schema

    userSchema = new this.Schema({
        _id: String,
        email: String,
        password: {type:String, select:false},
        firstName: String,
        lastName: String,
        permissionFlags: Number,
    }, {id: false})

    User = MongooseService.getMongoose().model('Users', this.userSchema);

    constructor() {
        log('Create a new intances of UserDao')

    }

    async addUser(userFields: CreateUserDto) {
        const userId = generate()
        const user = new this.User({
            _id: userId,
            ...userFields,
            permissionFlags: 1
        })
        await user.save()
        return userId

    }

    async getUserById(userId: string) {
        return this.User.findOne({ _id: userId
        }).populate('User').exec()
    }   
    
    async getUserByEmail(email: string) {
        return this.User.findOne({email: email}).exec()
    }

    async getUserByEmailWithPassword(email: string) {
        return this.User.findOne({email: email})
        .select('_id email permissionFlags +password')
        .exec()
    }

    async getUsers(limit = 25, page = 0) {
        return this.User.find()
            .limit(limit)
            .skip(limit * page)
            .exec()
    }

    async putUserById(userId: string,
        userFields: putUserDto | PatchUserDto) {
            const existingUser = await this.User.findOneAndUpdate(
                {_id: userId },
                {$set: userFields},
                {new: true}
            ).exec()
            return existingUser


        }

}

export default new UsersDao();