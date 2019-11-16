import * as Helper from '../src/helpers'

export const dynamoMock = {
  query: jest.fn((params, callback) => callback(null, 'success')),
  getItem: jest.fn((params, callback) => callback(null, 'success')),
  putItem: jest.fn((params, callback) => callback(null, { Item: params.Item })),
  updateItem: jest.fn((params, callback) => callback(null, 'success'))
}

export const awsConfigMock = {
  accessKeyId: 'AKID',
  secretAccessKey: 'secret',
  region: 'local-env'
}

describe('tableName()', () => {
  test('picks up from environment', () => {
    process.env.DYNAMO_TABLE_FRUIT = 'apple'
    expect(Helper.tableName('fruit')).toBe('apple')
  })

  test('defaults to prefix', () => {
    delete process.env.DYNAMO_TABLE_FRUIT
    expect(Helper.tableName('fruit')).toMatch(/.+fruit$/)
  })
})