import { Mongo } from "../../database/mongo.js";
import { ObjectId } from "mongodb";

const collectionName = 'users'

export default class UsersDataAccess {
    async getUsers(){
        const result = await Mongo.db
        .collection(collectionName)
        .find({})
        .toArray()

        return result
    }

    async addUser(userData){
        const result = await Mongo.db
        .collection(collectionName)
        .insertOne(userData)

        return result
    }

    async deleteUser(userId){
        const result = await Mongo.db
        .collection(collectionName)
        .findOneAndDelete({_id: new ObjectId(userId) })

        return result
    }

    async updateUser(userId, userData){
            const result = Mongo.db
            .collection(collectionName)
            .findOneAndUpdate(
                {_id: new ObjectId(userId) },
                { $set: userData }    
            )
    
            return result
    }
}
