import { InferSchemaType } from "mongoose"
import { RegisterRequest } from "../routes/registerRoutes.mjs"
import { UserDto } from "../models/UserDto.mjs"
import User from "../models/userSchema.mjs"

type UserType = InferSchemaType<typeof User.schema>

export const convertDbUsertoDto = (dbUser: UserType): UserDto => {
    return { name: dbUser.name, email: dbUser.email } 
}

export const createUser = async (data: RegisterRequest) => {
    
    const existingUser = await User.findOne({email: data.email})
    if(existingUser) {
        throw Error("User with email" + data.email + "already exists")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(data.password, salt)

    const newUser = await User.create({
        name: data.name,
        email: data.email,
        password: hash
    })

    return convertDbUsertoDto(newUser)

}
