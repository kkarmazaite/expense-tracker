import { IAccount } from "~~/types/IAccount"
import { ISelectedAccount} from "~~/types/ISelectedAccount"

export default () => {
    const useSelectedAccount = () => useState<ISelectedAccount| null>('selected_account', () => null)

    const setSelectedAccount = async (accountId:string | undefined) => {
        if(accountId){
            const selectedAccount:{account:ISelectedAccount} = await getAccountById(accountId) 
            const selectedAccountState = ref(useSelectedAccount())
            selectedAccountState.value = selectedAccount.account
        }
    }

    const createNewAccount = async({ name, userId}:{name:string | undefined, userId:string | undefined}) => {
        const data:{account:IAccount} = await useFetchApi('/api/accounts', {
            method: 'POST',
            body:{
                name,
                userId
            }
        })
        await setSelectedAccount(data.account.id)
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
        useSelectedAccount,
        setSelectedAccount,
        createNewAccount,
        getUserAccounts,
        getAccountById
    }
}
