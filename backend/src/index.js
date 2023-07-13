//Koa framework로 백엔드 서버 띄우기
const Koa = require('koa');

const app = new Koa();

//실제 서버에 띄워짐
app.use((ctx, next) => {
  console.log(ctx.url);
  console.log("1번째 미들웨어 실행");
  //요청 경로의 authorized 쿼리 파라미터가 1이 아니면 return
  if (ctx.query.authorized !== '1') {
    ctx.status = 401;
    return;
  }
  next().then(() => {
    console.log("END 1");
  }) //next가 없으면 이 다음 미들웨어를 실행하지 않음
});

app.use(async (ctx, next) => {
  console.log("2번째 미들웨어 실행");
  await next();
  console.log("END 2");
});

app.use(ctx => {
  ctx.body = "Hello World";
});

//콘솔창에 띄워짐
app.listen(4000, () => {
  console.log("Listening to port 4000");
});
