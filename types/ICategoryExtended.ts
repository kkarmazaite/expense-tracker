import { ICategory } from "./ICategory";
import { ITransaction } from "./ITransaction";

export interface ICategoryExtented extends ICategory {
    transactions: ITransaction[]
   }