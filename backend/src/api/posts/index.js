const Router = require('koa-router');
const postCtrl = require('./posts.ctrl');

const posts = new Router();

const printInfo = ctx => {
  ctx.body = {
    method: ctx.method,
    path: ctx.path,
    params: ctx.params,
  };
};

posts.get('/', postCtrl.list); //조회 기능
posts.post('/', postCtrl.write); //기본 작성기능
// posts.post('/:name', postCtrl.read);
posts.get('/:id', postCtrl.read); //읽기 기능
posts.delete('/:id', postCtrl.remove); //삭제 기능
posts.put('/:id', postCtrl.replace); //전체 객체 업데이트
posts.patch('/:id', postCtrl.update); //특정 객체 업데이트
module.exports = posts;

