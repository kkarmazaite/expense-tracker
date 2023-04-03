import { ICategory } from "./ICategory";
import { IIcon } from "./IIcon";
import { ITransaction } from "./ITransaction";

export interface ICategoryExtented extends ICategory {
    icon: IIcon | null
    transactions: ITransaction[]
   }