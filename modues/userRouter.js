const koaRouter = require('koa-router');
const multer = require('koa-multer');
const xlsx = require('xlsx');
const mongogse = require('./db.js');
const uploader = multer({
  storage: multer.memoryStorage(),
  limits: {
    fieldSize: 1024 * 1024
  }
});

const userSchema = new mongogse.Schema({
  name: String,
  age: Number
});
const User = mongogse.model('User', userSchema);

const usersRouter = new koaRouter();

usersRouter.get('/', async (ctx, next) => {
  ctx.response.body = await User.find();
});

usersRouter.get('/:id', async (ctx, next) => {
  const id = ctx.params.id;
  ctx.response.body = await User.find({id: id});
});


//curl -d '{"name":"zhangsan","age":"23"}' -H 'Content-type: application/json' http://127.0.0.1:3000/users/
usersRouter.post('/', async (ctx, next) => {
  const user = ctx.request.body;
  User.create(user, (err, _user) => {
    if (err) {
      console.error(err);
    } else {
      console.log(_user);
    }
  });
  ctx.response.body = { success: true, ...user }
});

//curl -F 'file=@/home/donnchao/Documents/test.xlsx' http://127.0.0.1:4200/users/upload
usersRouter.post('/upload', async (ctx, next) => {
  await uploader.single('file')(ctx);
  const file = ctx.req.file;
  const workbook = xlsx.read(file.buffer, { type: 'buffer' });
  const data = { filename: file.filedname, sheetnames: workbook.SheetNames }
  ctx.response.body = { success: true, data: data }
});

module.exports = usersRouter;