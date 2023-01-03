import { IAccount } from "~~/types/IAccount"

export default () => {
    const createNewAccount = async({ name, userId}:IAccount) => {
        await $fetch('/api/data/account', {
            method: 'POST',
            body:{
                name,
                userId
            }
        })
    }
    return{
        createNewAccount
    }
}
