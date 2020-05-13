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
export const COMMENT_NUM = 66

//网站相关信息
export const meta = {
  title: 'Kirk Dong 的博客',
  keywords: 'Kirk Dong,vue,react,董柯,前端技术开发,javascript技术,blog',
  description: '',
  url: 'kedong.me',
  author: 'Kirk Dong',
  defaultgravatar: "https://www.kedong.me/static/images/app/defaultgravatar.png"
}

//个人信息
export const personInfo = {
  hobby: '武侠古风，二次元，数码，跑步,游戏',
  aboutmeImg: "https://www.kedong.me/static/images/app/aboutme.jpg",
  mobileAvatar: "https://www.kedong.me/static/images/app/mobileAvatar.png",
  address: "浙江 , 杭州",
  email: 'dongkirk1992@gmail.com',

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


