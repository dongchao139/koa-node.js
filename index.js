const path = require('path');
const Koa = require('koa');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const views = require('koa-views');
const statics = require('koa-static');
const router = require('./modues/router');

const app = new Koa();
app.use(bodyParser());
app.use(cors());

app.use(async (ctx, next) => {
    let startTime = new Date();
    console.log('requesting url： ' + ctx.request.url);
    if (ctx.method === 'POST') {
        console.log('request body: ' + JSON.stringify(ctx.request.body));
    }
    await next();
    console.log('response total time: ', new Date() - startTime);
    console.log('');
});

app.use(views(__dirname + '/views'));
app.use(statics(
    path.join(__dirname, '/static')
));

app.use(router.routes()).use(router.allowedMethods());

app.listen(4200, () => {
    console.log('server is running at port 4200');
});
