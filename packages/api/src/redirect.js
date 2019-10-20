import wrapper from './helpers'

/** @typedef { import('koa').Context } Context */

/**
 * Actual function logic
 *
 * @param {Context} ctx
 */
export const handler = async (ctx) => {
  const slug = ctx.params.slug
  ctx.assert(slug, 400, 'Missing slug')
}

/**
 * Wrap handler for koa if needed
 */
export default wrapper(handler)
