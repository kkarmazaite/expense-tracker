import { expect, describe, it } from 'vitest'
import { userTransformer } from './user'

describe('User transformer', async() => {
  it('Check user transformer', () => {
    const input = {
      id: '638e002cdf7985b67b3b09db',
      email: "joe@gmail.com",
      name: "joe",
      password: "$2b$10$xHW1vJunEniKtkxqLcsmE.7t67dHjLmmnQO0KLnYrJPtnZlh98QOe",
      profileImage: "https://picsum.photos/200/200",
      createdAt: `2022-12-05T14:29:00.165+00:00`,
      updatedAt: `2022-12-05T14:29:00.165+00:00`,
    }
    const output = {
      id: '638e002cdf7985b67b3b09db',
      email: "joe@gmail.com",
      name: "joe",
      profileImage: "https://picsum.photos/200/200",
    }

    expect(userTransformer(input)).toStrictEqual(output)
  })

  
})