import { IUser } from "~~/types/IUser"

export const userTransformer = (user:IUser) => {
    return{
        id: user.id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage
    }
}