import jwtDecode from "jwt-decode"
import { IJwt } from "~~/types/IJwt"
import { ILogin } from "~~/types/ILogin"
import { IUser } from "~~/types/IUser"

export default () => {
    const useAuthToken = () => useState<string | null>('auth_token')
    const useAuthUser = () => useState<IUser | null>('auth_user')
    const useAuthLoading = () => useState<boolean>('auth_loading', () => true)

    const setToken = (newToken: string | null) => {
        const authToken = useAuthToken()
        authToken.value = newToken
    }

    const setUser = (newUser:IUser | null) => {
        const authUser = useAuthUser()
        authUser.value = newUser
    } 

    const setIsAuthLoading = (value: boolean) => {
        const authLoading = useAuthLoading()
        authLoading.value = value
    }

    const createNewUser = async({ email, password, repeatPassword, name}:IUser) => {
        
        const data:{user:IUser} = await $fetch('/api/auth/register', {
            method: 'POST',
            body:{
                email,
                password,
                repeatPassword,
                name
            }
        })

       return data

    }

    const login = async ({email, password}:ILogin) => {
        const data:{user:IUser, access_token:string} = await $fetch('/api/auth/login', {
            method: 'POST',
            body:{
                email,
                password
            }
        })
        setToken(data.access_token)
        setUser(data.user)

        return data
    }

    const refreshToken = async() => {
            const data:{access_token:string} = await useFetchApi('/api/auth/refresh')

            setToken(data.access_token)
            return data

    }
    const getUser = async() => {
        const data:{user:IUser} = await useFetchApi('/api/auth/user')

        setUser(data.user)
        return data


    }

    const reRefreshAccessToken = () => {
        const authToken = useAuthToken()

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
        setIsAuthLoading(true)
        
        try{
            await refreshToken()
            await getUser()
            reRefreshAccessToken()
        }catch(error){

        }
            setIsAuthLoading(false)
            redirect()
    }

    const logout = async() => {
        await useFetchApi('/api/auth/logout', {
            method: 'POST'
        })

        setToken(null)
        setUser(null)

        useRouter().push("/login")
    }

    const redirect = () => {
        if (useAuthUser().value) {
          useRouter().push("/");
        } else {
          useRouter().push("/login");
        }
      }

    return{
        login,
        createNewUser,
        useAuthToken,
        useAuthUser,
        useAuthLoading,
        initAuth,
        logout,
    }
}