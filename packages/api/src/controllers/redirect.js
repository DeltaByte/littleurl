import wrapper from '../helpers'
import Shortlink from '../models/shortlink'

/** @typedef { import('koa').Context } Context */

/**
 * Actual function logic
 *
 * @param {Context} ctx
 */
export const handler = async (ctx) => {
  const slug = ctx.params.slug
  ctx.assert(slug, 400, 'Missing slug')

  const domain = ctx.host
  ctx.assert(domain, 500, 'Failed to parse domain')

  const shortlink = Shortlink.get({ domain, slug })
  ctx.assert(shortlink)

  ctx.redirect(shortlink.target)
}

/**
 * Wrap handler for koa if needed
 */
export default wrapper(handler)
