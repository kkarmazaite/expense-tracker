import { IAccount } from "~~/types/IAccount"

export default () => {
    const createNewAccount = async({ name, userId}:{name:string | undefined, userId:string | undefined}) => {
        await useFetchApi('/api/data/account', {
            method: 'POST',
            body:{
                name,
                userId
            }
        })
    }
    const getUserAccounts = async() => {
        const data:{accounts:IAccount[]} = await useFetchApi('/api/data/account' )
        return data
    }
    return{
        createNewAccount,
        getUserAccounts
    }
}
