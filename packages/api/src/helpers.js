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
