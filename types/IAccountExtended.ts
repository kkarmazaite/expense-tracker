import { IAccount } from "./IAccount";
import { ICategoryExtented } from "./ICategoryExtended";

export interface IAccountExtented extends IAccount {
    categories: ICategoryExtented[]
   }