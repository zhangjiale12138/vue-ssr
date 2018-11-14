

const exp = require('express');
const server = exp();
const renderer = require('vue-server-renderer').createRenderer();
const createApp = require('./dist/bundle.server.js')['default'];



//设置静态文件目录

server.use('/', exp.static(__dirname + '/dist'));


//客户端打包地址

const clientBundleFileUrl = '/bundle.client.js';



//getHomeInfo请求

server.get('/api/getHomeInfo', (req, res) => {

    const list = [
        { title: '标题一', content: '这是获取的第一份数据' },
        { title: '标题二', content: '这是获取的第二份数据' }
    ]

    res.json({ list });

})




//路由响应请求

server.get('*', (req, res) => {


    const context = { url: req.url }


    //创建vue实例，传入请求路由信息

    createApp(context).then(app => {

        let state = JSON.stringify(context.state)

        renderer.renderToString(app, (err, html) => {
            if (err) {
                return res.status('500').end('运行时错误');
            }
            res.send(`
              <!DOCTYPE html>
              <html lang="en">
                  <head>
                      <meta charset="UTF-8">
                      <title>Vue2.0 SSR渲染页面</title>
                     <script>window.__INITIAL_STATE__ = ${state} </script>
                     <script src="${clientBundleFileUrl}"></script>
                  </head>
                  <body>
                     <div id="app">${html}</div>
                  </body>
              </html>
              `)
        })

    }, err => {

        if (err.code === 404) {

            res.status('404').end('所请求的页面不存在')
        }

    })

})

server.listen('8080', () => {

    console.log('服务器已启动。。。');

})