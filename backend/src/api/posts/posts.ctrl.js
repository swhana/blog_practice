let postId = 1;

const posts = [
  {
    id: 1,
    title: '제목',
    body: '내용',
  },
];

exports.write = ctx => {
  const { title, body } = ctx.request.body;
  postId += 1;
  const post = { id: postId, title, body };
  posts.push(post);
  ctx.body = post;
};

exports.list = ctx => {
  ctx.body = posts;
};

exports.read = ctx => {
  const { id } = ctx.params;
  const post = posts.find(p => p.id.toString() === id);

  if (!post) {
    ctx.status = 404;
    ctx.body = {
      message: '포스트가 존재하지 않습니다',
    };
    return;
  }

  ctx.body = post;
};

exports.remove = ctx => {
  const { id } = ctx.params;
  const index = posts.findIndex(p => p.id.toString() === id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: '존재하지 않는 포스트입니다',
    };
    return;
  }
  posts.splice(index, 1); //index번째 포스트를 1개 삭제
  ctx.status = 204; //No content
};

exports.replace = ctx => {
  const { id } = ctx.params;

  const index = posts.findIndex(p => p.id.toString() === id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: '존재하지 않는 포스트입니다',
    };
    return;
  }

  //새로 덮어쓸 post 객체
  posts[index] = {
    id,
    ...ctx.request.body,
  };

  ctx.body = posts[index];
};

exports.update = ctx => {
  const { id } = ctx.params;
  const index = posts.findIndex(p => p.id.toString() === id);

  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: '존재하지 않는 포스트입니다',
    };
    return;
  };

  posts[index] = {
    ...posts[index],
    ...ctx.request.body,
  };

  ctx.body = posts[index];
};