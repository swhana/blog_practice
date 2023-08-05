//Koa framework로 백엔드 서버 띄우기
require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router');
const BodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');

const { PORT, MONGO_URI } = process.env;
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(e => {
    console.log(e);
  });

const api = require('./api');

const app = new Koa();
const router = new Router();

//라우터 설정
router.use('/api', api.routes());

//라우터 적용 전에 bodyparser 적용해야함
app.use(BodyParser());

//app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

const port = PORT || 4000;

app.listen(port, () => {
  console.log('Listening to port %d', port);
});
