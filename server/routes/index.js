const router = require('koa-router')();
const mockData = require('../mock/mockdata');

Object.keys(mockData.data).forEach(reqUrl => {
  if (reqUrl === 'getFormdesignById') {
    router.post(mockData.path + reqUrl, async (ctx, next) => {
      let uuid = ctx.request.body.uuid;
      ctx.res.setHeader('Access-Control-Allow-Origin', '*');
      if (uuid === '1c8efab6c37d11e7b7517b16d465tab4') {
        ctx.body = {
          'code': 'auth-access',
          'message': '操作成功',
          'data': {
            'CONTENT': 'PHRhYmxlIGRhdGEtc29ydD0ic29ydERpc2FibGVkIj48dGJvZHk+PHRyIGNsYXNzPSJmaXJzdFJvdyI+PHRkIHdpZHRoPSIyNjciIHZhbGlnbj0ibWlkZGxlIiBzdHlsZT0id29yZC1icmVhazogYnJlYWstYWxsOyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjM3LCAyNDUsIDI1MCk7IiBhbGlnbj0iY2VudGVyIj7lt6XkvZzml7bpl7Q8L3RkPjx0ZCB2YWxpZ249InRvcCIgcm93c3Bhbj0iMSIgY29sc3Bhbj0iMyIgd2lkdGg9IjgzOCI+PGlucHV0IHR5cGU9InRleHQiIHBsdWdpbnR5cGU9ImlucHV0IiBjbGFzcz0iZWxlLWlucHV0IiBmaWVsZHRpdGxlPSLlt6XkvZzml7bpl7QiIGZpZWxkbmFtZT0icGVyaW9kIiBmaWVsZGxlbmd0aD0iMTAwIiBmaWVsZHR5cGU9ImNoYXIiIGRlZmF1bHR2YWw9IiIgcGxhY2Vob2xkZXI9IuW3peS9nOaXtumXtCIgaXNyZWFkb25seT0iMCIgaXNyZXF1aXJlZD0iMCIgZXZlbnR0eXBlPSIiIHZhbGlkYXRvcj0iIiBzdHlsZT0id2lkdGg6IDEwMCU7Ii8+PC90ZD48L3RyPjx0cj48dGQgd2lkdGg9IjI2NyIgdmFsaWduPSJtaWRkbGUiIHN0eWxlPSJ3b3JkLWJyZWFrOiBicmVhay1hbGw7IGJhY2tncm91bmQtY29sb3I6IHJnYigyMzcsIDI0NSwgMjUwKTsiIGFsaWduPSJjZW50ZXIiPui0n+i0o+WGheWuuTwvdGQ+PHRkIHZhbGlnbj0idG9wIiByb3dzcGFuPSIxIiBjb2xzcGFuPSIzIiBzdHlsZT0id29yZC1icmVhazogYnJlYWstYWxsOyIgd2lkdGg9IjY2NyI+PHRleHRhcmVhIHBsdWdpbnR5cGU9InRleHRhcmVhIiBjbGFzcz0iZWxlLXRleHRhcmVhIiBmaWVsZHRpdGxlPSLotJ/otKPlhoXlrrkiIGZpZWxkbmFtZT0iZHV0eSIgZmllbGRsZW5ndGg9IjEwMDAiIGZpZWxkdHlwZT0iY2hhciIgZGVmYXVsdHZhbD0iIiBwbGFjZWhvbGRlcj0i6LSf6LSj5YaF5a65IiBpc3JlYWRvbmx5PSIwIiBpc3JlcXVpcmVkPSIxIiBtYXhsZW5ndGg9IjEwMDAiIHJvd3M9IjUiIHN0eWxlPSJ3aWR0aDogMTAwJTsiPjwvdGV4dGFyZWE+PC90ZD48L3RyPjwvdGJvZHk+PC90YWJsZT4=',
            'PTABLENAME': 'example',
            'NAME': '工作经历单',
            'PS': 'demo',
            'UUID': '1c8efab6c37d11e7b7517b16d465tab4',
            'TABLENAME': 'exp'
          }
        };
      } else {
        ctx.body = mockData.data[reqUrl];
      }
    });
  } else {
    router.post(mockData.path + reqUrl, async (ctx, next) => {
      ctx.res.setHeader('Access-Control-Allow-Origin', '*');
      ctx.body = mockData.data[reqUrl];
    });
  }
})
;

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
