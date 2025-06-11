import User from "../models/userSchema.mjs";
import bcrypt from "bcrypt"
import { convertDbUsertoDto } from "./registerController.mjs";


export const loginUser = async (email: string, password: string) => {
    const foundUser = await User.findOne({email: email})
    if(!foundUser) throw Error("There is no user registered with email" + email )
    
    const success = await bcrypt.compare(password, foundUser.password)
    if(success) {
        return convertDbUsertoDto(foundUser)
    } else {
        return undefined
    }
}