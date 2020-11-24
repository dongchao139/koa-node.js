const koaRouter = require('koa-router');
const usersRouter = require('./userRouter');
const pinduoduoRouter = require('./pinduoduoRouter');

const router = new koaRouter();

router.get('index', /.*\.html/, async (ctx, next) => {
  await ctx.render('index');
});

router.get(/.*home.html/, async (ctx, next) => {
  ctx.redirect(ctx.router.url('index'));
});

router.use('/users', usersRouter.routes(), usersRouter.allowedMethods());
router.use('/pdd', pinduoduoRouter.routes(), pinduoduoRouter.allowedMethods());

router.all(/\/*/, async (ctx, next) => {
  ctx.response.status = 404;
  ctx.response.body = {success: false, data: 'Resource Not Found'};
});

module.exports = router;