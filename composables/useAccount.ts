export default () => {
    const createNewAccount = async({ name, userId}:{name:string | undefined, userId:string | undefined}) => {
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
