import Koa from 'koa'
import serverless from 'serverless-http'

/**
 * Detect if the current environment is AWS lambda
 */
export const isLambda = () => {
  if ((process.env.AWS_EXECUTION_ENV || '').match(/AWS_Lambda_.+/)) {
    return true
  }
}

export const getProvider = () => {
  // AWS
  if (process.env.AWS_EXECUTION_ENV) {
    const env = process.env.AWS_EXECUTION_ENV
    let provider = { name: 'AWS' }

    // service TODO: strip each section from total string
    if (env.match(/AWS_Lambda.+/)) {
      provider.service = 'Lambda'
    } else if (env.match(/AWS_ECS_EC2.+/)) {
      provider.service = 'ECS'
    } else if (env.match(/AWS_ECS_FARGATE.+/)) {
      provider.service = 'Fargate'
    }

    // runtime
    provider.runtime = env.split('_').pop()

    return `${provider.name};${provider.service};${provider.runtime}`
  }

  // GCP
  if (process.env.GOOGLE_RUNTIME) {
    return 'GCP'
  }

  // Azure
  if (process.env.AZURE_RUNTIME) {
    return 'Azure'
  }
}

/**
 * Add bindings for running as a function.
 *
 * @param {function} handler
 */
export const wrapper = (handler) => {
  if (isLambda()) {
    // build new koa instance
    const app = new Koa()
    app.use(handler)

    // wrap koa for lambda
    return async (event, context) => {
      return serverless(app)(event, context)
    }
  }

  // just pass handler back without modification
  return handler
}

/**
 * URIs that cannot be used for slugs
 */
export const reservedRoutes = [
  '/api',
  '/dashboard'
]

/**
 * Get the table name from the environment or return default
 * 
 * TODO: this probably needs refactoring when other DB providers get added
 *
 * @param {string} name
 * @returns {string}
 */
export const tableName = (name) => {
  const envvar = `DYNAMO_TABLE_${name.toUpperCase()}`
  const prefix = 'littleurl-'
  return process.env[envvar] || `${prefix}${name.toLowerCase()}`
}
