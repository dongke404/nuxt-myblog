/**
 * @file App config / ES module
 * @module app.config
 */

//路由对应的图片文字
export const routerMap = {
  category: {
    "code": {
      backgroundImg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587476750879&di=0548ad852b992ec8ebfd17ed10f55ef3&imgtype=0&src=http%3A%2F%2Fup.92sucai.com%2Fold%2Fallimg%2F150525%2F1307-1505251051540-L.jpg",
      text: "代码",
      icon: "code"
    },
    "think": {
      backgroundImg: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1445960240,1529366929&fm=26&gp=0.jpg",
      text: "思考",
      icon: "think"
    },
    "life": {
      backgroundImg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587476917725&di=41f5ce223b02e43e5e4897f3ac237bb7&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201409%2F07%2F20140907115857_L2njv.jpeg",
      text: "生活",
      icon: "life"
    },
  },
  search:{
    backgroundImg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587476917725&di=41f5ce223b02e43e5e4897f3ac237bb7&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201409%2F07%2F20140907115857_L2njv.jpeg",
    text: "搜索",
    icon: "search"
  },
  date:{
    backgroundImg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587476917725&di=41f5ce223b02e43e5e4897f3ac237bb7&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201409%2F07%2F20140907115857_L2njv.jpeg",

    icon: "date"
  },
  guestbook: {
    backgroundImg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587476917725&di=41f5ce223b02e43e5e4897f3ac237bb7&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201409%2F07%2F20140907115857_L2njv.jpeg",
    text: "留言板",
  }
}



//单页显示评论条数
export const COMMENT_NUM = 16

//个人的信息
export const meta = {
  title: 'dongkirk.xyz',
  keywords: '',
  description: '',
  url: 'dongkirk.xyz',
  author: 'Dongkirk',
  email: '',
  defaultgravatar: "http://www.dongkirk.xyz/static/images/uploadHead/1587315727232don.png"
}

export const links = {
  Mysite:'http://www.dongkirk.xyz/'

}

export const friendLinks = {

}

export const music = {
}

export const fetch = {
  delay: 800
}

export const color = {
  primary: '#0088f5'
}

export default {
  meta,
  links,
  music,
  fetch,
  color,
  friendLinks,
  COMMENT_NUM
}
