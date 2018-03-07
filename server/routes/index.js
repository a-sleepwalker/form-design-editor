const router = require('koa-router')();
const mockData = require('../mock/mockdata');

Object.keys(mockData.data).forEach(reqUrl => {
  router.post(mockData.path + reqUrl, async (ctx, next) => {
    ctx.res.setHeader('Access-Control-Allow-Origin', '*');
    ctx.body = mockData.data[reqUrl];
  });
});

// router.get('/', async (ctx, next) => {
//   ctx.body = 'it works !';
// });
//
// router.get('/string', async (ctx, next) => {
//   ctx.body = 'koa2 string';
// });
//
// router.get('/json', async (ctx, next) => {
//   ctx.body = {
//     title: 'koa2 json'
//   };
// });
// router.post('/home', async (ctx, next) => {
//   ctx.body = {
//     title: 'hello'
//   };
// });

module.exports = router;
