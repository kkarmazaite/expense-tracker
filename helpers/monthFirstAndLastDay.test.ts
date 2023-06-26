import { expect, describe, it } from 'vitest'
import { monthFirstAndLastDay } from './monthFirstAndLastDay'

describe('Helper | monthFirstAndLastDay', async() => {
  it('Check monthFirstAndLastDay function', () => {
    const input = new Date('2023-04-19')
    const output = {
      firstDay:new Date('2023-04-01'),
      lastDay: new Date('2023-04-30'),
    }

    expect(monthFirstAndLastDay(input)).toStrictEqual(output)
    expect(monthFirstAndLastDay(input)).toMatchSnapshot()
  })
})
