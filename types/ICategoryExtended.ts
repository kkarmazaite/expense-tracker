import { ICategory } from "./ICategory";
import { IColor } from "./IColor";
import { IIcon } from "./IIcon";
import { ITransaction } from "./ITransaction";

export interface ICategoryExtented extends ICategory {
    icon: IIcon | null
    color: IColor | null
    transactions: ITransaction[]
   }