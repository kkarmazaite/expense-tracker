import { IAccount } from "~~/types/IAccount"
import { ISelectedAccount} from "~~/types/ISelectedAccount"

export default () => {

    const createNewAccount = async({ name, userId}:{name:string | undefined, userId:string | undefined}) => {
        const data:{account:IAccount} = await useFetchApi('/api/accounts', {
            method: 'POST',
            body:{
                name,
                userId
            }
        })
        return data
    }
    const getUserAccounts = async() => {
        const data:{accounts:IAccount[]} = await useFetchApi('/api/accounts' )
        return data
    }

    const getAccountById = async(accountId:string) => {
        const data:{account:ISelectedAccount} = await useFetchApi(`/api/accounts/${accountId}` )
        return data
    }
    return{
        createNewAccount,
        getUserAccounts,
        getAccountById
    }
}
