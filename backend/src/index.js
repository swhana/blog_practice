//Koa framework로 백엔드 서버 띄우기
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/', ctx => {
  ctx.body = '홈';
});

router.get('/about/:name?', ctx => {
  const { name } = ctx.params; // /about/10 이런 식의 파라미터를 읽어옴
  ctx.body = name ? `${name}의 소개 페이지` : '소개';
});

router.get('/posts', ctx => {
  const { id } = ctx.query; // /posts/?id=10 이런 식의 쿼리를 읽어옴
  ctx.body = id ? `${id}의 포스트` : '포스트 아이디가 없습니다';
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
  console.log('Listening to port 4000');
});
