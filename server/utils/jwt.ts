import jwt from 'jsonwebtoken'
import { IUser } from '~~/types/IUser'
import { H3Event } from "h3"
import { IToken } from '~~/types/IToken'

const generateAccessToken = (user:IUser) : string => {
  const config = useRuntimeConfig()

  return jwt.sign({ userId: user.id }, config.jwtAccessSecret, {
    expiresIn: '10m',
  })

}

const generateRefreshToken = (user:IUser) : string => {
  const config = useRuntimeConfig()

  return jwt.sign({ userId: user.id }, config.jwtRefreshSecret, {
    expiresIn: '4h',
  })
    
}

export const decodeRefreshToken = (token:string) : IToken | null => {
  const config = useRuntimeConfig()

  try{
    return jwt.verify(token, config.jwtRefreshSecret)  as IToken
  } catch (error){
    return null
  }
} 
export const decodeAccessToken = (token:string) : IToken | null => {
  const config = useRuntimeConfig()

  try {
    return jwt.verify(token, config.jwtAccessSecret) as IToken
  } catch (error) {
    return null
  }
}

export const generateTokens = (user:IUser) => {
  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)

  return{
    accessToken: accessToken,
    refreshToken: refreshToken,
  }
}

export const sendRefreshToken = (event:H3Event, token:string) => {
  setCookie(event, "refresh_token", token, {
    httpOnly: true,
    sameSite: true,
  })
}