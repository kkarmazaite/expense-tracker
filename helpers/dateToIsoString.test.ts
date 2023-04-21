import { expect, describe, it } from 'vitest'
import { dateToIsoString } from './dateToIsoString'

describe('Helper | dateToIsoString', async() => {
  it('Check dateToIsoString function', () => {
    const input = new Date('2023-04-19')
    const output = '2023-04-19'

    expect(dateToIsoString(input)).toStrictEqual(output)
  })
})