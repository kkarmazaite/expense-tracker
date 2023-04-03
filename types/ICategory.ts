export type ICategoryAccountTypes = "income" | "expense"
export interface ICategory {
    id?: string
    accountId: string
    iconId?: string | null | undefined
    type: ICategoryAccountTypes
    name: string
  }