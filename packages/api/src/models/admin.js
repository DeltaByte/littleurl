import dynamodb from 'dynamodb'
import Joi from '@hapi/joi'
import { tableName } from '../helpers'

/**
 * Allowed entity types and their validation
 * 
 * @constant {object}
 */
const entities = {
  domain: Joi.string(),
  user: Joi.string()
}

export default dynamodb.define('Shortlink', {
  hashKey: 'entity', // e.g. domain, user, multifactor
  rangeKey: 'identifier', // e.g. person@example.com
  timestamps: true,
  tableName: tableName('admin'),
  schema: {
    id: dynamodb.types.uuid(),
    entity: Joi.string().valid(Object.keys(entities)).required(),
    identifier: Joi.string().required().concat(entities[Joi.ref('entity')])
  }
})
