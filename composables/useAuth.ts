import jwtDecode from "jwt-decode"
import { IJwt } from "~~/types/IJwt"
import { ILogin } from "~~/types/ILogin"
import { IUser } from "~~/types/IUser"

export default () => {
  const authToken = useState<string | null>('auth_token')
  const authUser = useState<IUser | null>('auth_user')
  const authLoading = useState<boolean>('auth_loading', () => true)


  const createNewUser = async({
    email, password, repeatPassword, name, 
  }:IUser) => {
        
    const data:{user:IUser} = await $fetch('/api/auth/register', {
      method: 'POST',
      body:{
        email,
        password,
        repeatPassword,
        name,
      },
    })

    return data

  }

  const login = async ({ email, password }:ILogin) => {
    const data:{user:IUser, access_token:string} = await $fetch('/api/auth/login', {
      method: 'POST',
      body:{
        email,
        password,
      },
    })
    authToken.value = data.access_token
    authUser.value = data.user

    return data
  }

  const refreshToken = async() => {
    const data:{access_token:string} = await useFetchApi('/api/auth/refresh')

    authToken.value = data.access_token
    return data

  }
  const getUser = async() => {
    const data:{user:IUser} = await useFetchApi('/api/auth/user')

    authUser.value = data.user
    return data


  }

  const reRefreshAccessToken = () => {
    if(!authToken.value){
      return
    }

    const jwt:IJwt = jwtDecode(authToken.value) 

    const newRefreshTime = jwt.exp - 60000

    setTimeout(async () => {
      await refreshToken()
      reRefreshAccessToken()
    }, newRefreshTime)
  }

  const initAuth = async() => {
    authLoading.value = true
        
    try{
      await refreshToken()
      await getUser()
      reRefreshAccessToken()
    }catch(error){

    }
    redirect()
    authLoading.value = false
    
  }

  const logout = async() => {
    await useFetchApi('/api/auth/logout', {
      method: 'POST',
    })

    authToken.value = null
    authUser.value = null

    useRouter().push("/login")
  }

  const redirect = () => {
    if (authUser.value) {
      useRouter().push("/");
    } else {
      useRouter().push("/login");
    }
  }

  return{
    login,
    createNewUser,
    authToken,
    authUser,
    authLoading,
    initAuth,
    logout,
  }
}