import { expect, describe, it } from 'vitest'
import { displayCurrency } from './displayCurrency'

describe('Helper | displayCurrency', async() => {
  it('Check displayCurrency function', () => {
    const input:number = 20
    const output:string = '20,00 EUR'

    expect(displayCurrency(input).replace(/\s/, ' ')).toEqual(output);
    expect(displayCurrency(input).replace(/\s/, ' ')).toMatchSnapshot()
  })
})