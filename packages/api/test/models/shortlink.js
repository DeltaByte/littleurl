import Shortlink from '../../src/models/shortlink'

describe('Shortlink model type', () => {
  test('fails with invalid schema', async () => {
    expect(() => {
      const model = new Shortlink({})
    }).toThrow()
  })
})