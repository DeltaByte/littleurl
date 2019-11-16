import Shortlink from '../../src/models/shortlink'
import dynamoose from 'dynamoose'
import { dynamoMock, awsConfigMock } from '../helpers'

beforeEach(() => {
  dynamoose.AWS.config.update(awsConfigMock)
  dynamoose.setDDB(dynamoMock)
})

afterEach(() => {
  dynamoose.revertDDB()
})

describe('schema', () => {
  test('fails with invalid schema', () => {
    expect(
      Shortlink.create({ domain: 'example.com', slug: '###INVALID_SLUG###', description: 'a'.repeat(2000) })
    ).rejects.toThrow(/^Validation failed/)
  })

  test('allows correct schema', async () => {
    let errored = false
    try {
      await Shortlink.create({ domain: 'example.com', slug: 'valid-slug', description: 'a'.repeat(1000) })
    } catch (error) {
      errored = true
    }
    expect(errored).toBe(false)
  })
})