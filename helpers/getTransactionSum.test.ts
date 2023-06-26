import { expect, describe, it } from 'vitest'
import { ITransaction } from '~~/types/ITransaction'
import { getTransactionSum } from './getTransactionSum'

describe('Helper | getTransactionSum', async() => {
  it('Check getTransactionSum function', () => {
    const input:ITransaction[] = [
      {
        id:"64393641fb31c3d4ab87beaa",
        date: new Date("2023-04-14T00:00:00.000Z"),
        amount:100,
        description:"",
        categoryId:"63da749ec2b86311ffab27a5",
        category: {
          accountId:"63da7427c2b86311ffab279f",
          color:null,
          colorId:null,
          icon:{
            id:"6426d6eaf4d0051801e1b45b",
            name:"tax",
          },
          iconId:"6426d6eaf4d0051801e1b45b",
          id:"63da749ec2b86311ffab27a5",
          name:"tax",
          type:"expense",

        },
      },
      {
        id:"64393641fb31c3d4ab87beaa",
        date: new Date("2023-04-14T00:00:00.000Z"),
        amount:200,
        description:"",
        categoryId:"63da749ec2b86311ffab27a5",
        category: {
          accountId:"63da7427c2b86311ffab279f",
          color:null,
          colorId:null,
          icon:{
            id:"6426d6eaf4d0051801e1b45b",
            name:"tax",
          },
          iconId:"6426d6eaf4d0051801e1b45b",
          id:"63da749ec2b86311ffab27a5",
          name:"tax",
          type:"expense",

        },
      },
    ]
    const output:number = 300

    expect(getTransactionSum(input)).toEqual(output);
    expect(getTransactionSum(input)).toMatchSnapshot()
  })
})