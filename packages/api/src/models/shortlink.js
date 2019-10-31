import dynamodb from 'dynamodb'
import Joi from '@hapi/joi'
import { tableName } from '../helpers'

export default dynamodb.define('Shortlink', {
  hashKey: 'domain',
  rangeKey: 'slug',
  timestamps: true,
  tableName: tableName('shortlinks'),
  schema: {
    id: dynamodb.types.uuid(),
    domain: Joi.string().domain(),
    slug: Joi.string().pattern(/[\w\-]+/).min(3).max(128),
    description: Joi.string().max(1024)
  }
})
