export interface IUser {
    id?: string
    name: string
    password?: string
    repeatPassword?: string
    email: string
    profileImage?: string | null
  }