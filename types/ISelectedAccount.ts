import { ICategory } from "./ICategory"
import { ITransaction } from "./ITransaction"

interface IAccountCategories extends ICategory{
    transactions: IAccountCategoryTransaction
}
interface IAccountCategoryTransaction extends ITransaction{
    category: ICategory
}
export interface ISelectedAccount {
    id?: string
    userId: string
    name: string
    categories: IAccountCategories[]
  }