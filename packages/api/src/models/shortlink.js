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
 * Validation Schema
 *
 * @constant {Joi.SchemaLike} schema
 */
export const validation = {
  domain: Joi.string().domain().required(),
  slug: Joi.string().pattern(/^[\w-]+$/).min(3).max(128),
  description: Joi.string().max(1024)
}

/**
 * Attribute definitions
 *
 * @constant {dynamoose.Schema} schema
 */
const schema = new dynamoose.Schema(
  {
    domain: {
      type: String,
      hashKey: true,
      required: true,
      validate: (value) => !validation.domain.validate(value).error
    },
    slug: {
      type: String,
      rangeKey: true,
      required: true,
      validate: (value) => !validation.slug.validate(value).error
    },
    description: {
      type: String,
      required: false,
      validate: (value) => !validation.description.validate(value).error
    }
  },
  {
    // https://dynamoosejs.com/api/schema/#options
  }
)

export default dynamoose.model(tableName('shortlink'), schema, options)