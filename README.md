# nuxt-myblog

> My brilliant Nuxt.js project

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

后端开发端口 5000

网易云接口 https://binaryify.github.io/NeteaseCloudMusicApi/

放入生产环境运行
在package.json  设置端口和ip
```
  "config":{
    "nuxt":{
      "host":"172.17.0.2",
      "port":"4000"
    }
  },
```
npm run build后将

.nuxt  
config  
static  
nuxt.config.js  
package-lock.json  
package.json  
6个文件放入服务器后  
npm install  
npm run start



For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
