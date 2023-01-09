import { IAccount } from "~~/types/IAccount"

export default () => {
    const useSelectedAccount = () => useState<IAccount | null>('selected_account', () => null)

    const setSelectedAccount = (account:IAccount) => {
        const selectedAccount = useSelectedAccount()
        selectedAccount.value = account
    }

    const createNewAccount = async({ name, userId}:{name:string | undefined, userId:string | undefined}) => {
        await useFetchApi('/api/accounts', {
            method: 'POST',
            body:{
                name,
                userId
            }
        })
    }
    const getUserAccounts = async() => {
        const data:{accounts:IAccount[]} = await useFetchApi('/api/accounts' )
        return data
    }

    const getAccountById = async(accountId:string) => {
        const data:{account:IAccount} = await useFetchApi(`/api/accounts/${accountId}` )
        return data
    }
    return{
        useSelectedAccount,
        setSelectedAccount,
        createNewAccount,
        getUserAccounts,
        getAccountById
    }
}
