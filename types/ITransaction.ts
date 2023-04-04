
import { ICategory } from "./ICategory"
import { IColor } from "./IColor"
import { IIcon } from "./IIcon"

export interface ITransactionCreation {
    id?: string
    categoryId: string
    date: Date
    amount: number
    description?: string | null
  }
export interface ITransaction {
    id?: string
    categoryId: string
    category: ICategory  & { icon: IIcon | null; color: IColor | null}
    date: Date
    amount: number
    description?: string | null
  }