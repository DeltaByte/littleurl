import Koa from 'koa'
import Router from 'koa-router'
import { handler as redirectHandler } from './controllers/redirect'

// init koa
const app = new Koa()
const router = new Router()

router.get('/:slug', redirectHandler)

// bind routes to koa
app.use(router.routes()).use(router.allowedMethods())
