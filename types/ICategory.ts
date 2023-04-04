export type ICategoryAccountTypes = "income" | "expense"
export interface ICategory {
    id?: string
    accountId: string
    iconId?: string | null
    colorId?: string | null
    type: ICategoryAccountTypes
    name: string
  }