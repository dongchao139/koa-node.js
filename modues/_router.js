class Router {
  constructor() {
    this._routers = [];
  }

  get(url, handler) {
    this._routers.push({
      url: url,
      method: 'GET',
      handler: handler
    })
  }

  routes() {
    return async (ctx, next) => {
      const {method, url} = ctx.request;
      const matchedRouter = this._routers.find(r => r.method === method
        && r.url === url);
      if (matchedRouter && matchedRouter.handler) {
        await matchedRouter.handler(ctx, next);
      } else {
        await next();
      }
    }
  }
}