const serverless = require('serverless-http');
const Koa = require('koa'); // or any supported framework

const app = new Koa();

app.use(async ctx => {
    ctx.redirect('https://google.co.uk')
});

const handler = serverless(app);
module.exports.handler = async (event, context) => {
  return await handler(event, context);
};
