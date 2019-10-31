import Koa from 'koa'
import serverless from 'serverless-http'

/**
 * Detect if the current environment is AWS lambda
 */
export const isLambda = () => {
  return process.env.BUILD_TARGET === 'lambda'
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
