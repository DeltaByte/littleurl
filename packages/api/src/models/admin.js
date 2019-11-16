import Joi from '@hapi/joi'
import dynamoose from 'dynamoose'
import { tableName, validate } from '../helpers'

/**
 * Model configuration
 *
 * @constant {dynamoose.ModelOption} options
 */
const options = {
  create: false, // prevent table creation
  update: false, // prevent index modification
  waitForActive: false // don't check for table readiness
}
/**
 * Allowed entity types and their validation
 * 
 * @constant {object}
 */
const entities = {
  domain: Joi.string(),
  user: Joi.string()
}

/**
 * Validation Schema
 *
 * @constant {Joi.SchemaLike} schema
 */
const validation = {
  entity: Joi.string().valid(Object.keys(entities)).required(),
  identifier: Joi.string().required().concat(entities[Joi.ref('entity')])
}

/**
 * Attribute definitions
 *
 * @constant {dynamoose.Schema} schema
 */
const schema = new dynamoose.Schema(
  {
    entity: {
      type: String,
      hashKey: true,
      required: true,
      validate: (value) => !validation.entity.validate(value).error
    },
    identifier: {
      type: String,
      rangeKey: true,
      required: true,
      validate: (value) => !validation.identifier.validate(value).error
    }
  },
  {
    // https://dynamoosejs.com/api/schema/#options
  }
)

export default dynamoose.model(tableName('admin'), schema, options)
