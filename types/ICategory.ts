export type ICategoryAccountTypes = "income" | "expense"
export interface ICategory {
    id?: string
    accountId: string
    type: ICategoryAccountTypes
    name: string
  }