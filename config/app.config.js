/**
 * @file App config / ES module
 * @module app.config
 */

//路由对应的图片文字
export const routerMap = {
  category: {
    "code": {
      backgroundImg: " https://www.kedong.me/static/images/app/code.jpg",

      text: "代码",
      icon: "code"
    },
    "think": {
      backgroundImg: " https://www.kedong.me/static/images/app/think.jpg",
      text: "思考",
      icon: "think"
    },
    "life": {
      backgroundImg: " https://www.kedong.me/static/images/app/life.jpg",
      text: "生活",
      icon: "life"
    }
  },
  search: {
    backgroundImg: " https://www.kedong.me/static/images/app/search.jpg",
    text: "搜索",
    icon: "search"
  },
  date: {
    backgroundImg: " https://www.kedong.me/static/images/app/date.jpg",
    icon: "date"
  },
  guestbook: {
    backgroundImg: " https://www.kedong.me/static/images/app/guestbook.jpg",
    text: "留言板",
  }
}


//单页显示评论条数
export const COMMENT_NUM = 88

//网站相关信息
export const meta = {
  title: 'Kirk Dong 的博客',
  keywords: 'Kirk Dong,vue,react,董柯,前端技术开发,javascript技术,blog',
  description: '',
  url: 'kedong.me',
  author: 'Kirk Dong',
  email: 'dongkirk1992@gmail.com',
  defaultgravatar: "http://www.dongkirk.xyz/static/images/uploadHead/1587315727232don.png"
}

//个人信息
export const personInfo = {
  hobby: '武侠古风，二次元，数码，跑步'
}

export const links = {
  Mysite: 'http://www.dongkirk.xyz/'

}

export const friendLinks = {

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
  fetch,
  color,
  friendLinks,
  COMMENT_NUM
}
