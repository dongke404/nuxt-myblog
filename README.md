# nuxt-myblog

> My brilliant Nuxt.js project

## Build Setup

```bash
# install dependencies
$ yarn 

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

后端开发端口设了 5000

域名配置在configs api.config.js里配置

网易云接口 <https://binaryify.github.io/NeteaseCloudMusicApi/>

放入生产环境运行

Docker若未设置与主机网络互通模式需要重新设置post 和 port,按博客部署不用设置
在package.json  设置端口和ip

```json
  "config":{
    "nuxt":{
      "host":"172.17.0.2",
      "port":"4000"
    }
  },
```

yarn build后将

.nuxt  
config  
static  
nuxt.config.js  
package-lock.json  
package.json  
6个文件放入服务器后  

服务器端
yarn
yarn start

保姆级部署详情请查看我的博客<https://www.kedong.me/article/80>
For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
