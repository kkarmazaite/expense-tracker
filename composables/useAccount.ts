import { IAccount } from "~~/types/IAccount"
import { IAccountExtented } from "~~/types/IAccountExtended"

export default () => {

  const createNewAccount = async({ name, userId }:{name:string | undefined, userId:string | undefined}) => {
    const data:{account:IAccount} = await useFetchApi('/api/accounts', {
      method: 'POST',
      body:{
        name,
        userId,
      },
    })
    return data
  }
  const getUserAccounts = async() => {
    const data:{accounts:IAccountExtented[]} = await useFetchApi('/api/accounts')
    return data
  }

  const getAccountById = async(accountId:string) => {
    const data:{account:IAccount} = await useFetchApi(`/api/accounts/${accountId}`)
    return data
  }
  const deleteAccount = async(accountId:string) => {
    await useFetchApi(`/api/accounts/${accountId}`, { method: 'DELETE' })
  }
  return{
    createNewAccount,
    getUserAccounts,
    getAccountById,
    deleteAccount,
  }
}
