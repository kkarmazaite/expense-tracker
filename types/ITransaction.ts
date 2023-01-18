import { ICategory } from "./ICategory"

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
    category: ICategory
    date: Date
    amount: number
    description?: string | null
  }