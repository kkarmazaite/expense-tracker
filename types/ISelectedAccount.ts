import { IAccount } from "./IAccount"
import { ICategory } from "./ICategory"

export interface ISelectedAccount {
    account: IAccount
    accountCategories: ICategory[]
}