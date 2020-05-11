/**
 * @file System constant / ES module
 */

// 评论宿主页面的 POST_ID 类型
export const CommentPostType = {
  Guestbook: 0 // 留言板
}

// 转载状态
export const OriginState = {
  Original: 0, // 原创
  Reprint: 1, // 转载
  Hybrid: 2 // 混合
}


//语言选择
export const Language = {
  Zh: 'zh',
  En: 'en',
  Jp: 'jp'
}

//主题选择
export const Theme = {
  Default: 'bright',
  Dark: 'dark',
  Waterblue: 'waterblue',
}

export const SortType = {
  Asc: 1, // 升序
  Desc: -1, // 降序
  Hot: 2 // 热序
}

export const Route = {
  Index: 'index',
  ArticleDetail: 'article-article_id',
  SearchArchive: 'search-keyword',
  Guestbook: 'guestbook',
  About: 'about',
  Timeline: 'timeline',
  Photo: "photo-photo_album"

}



export const StorageField = {
  Theme: 'theme',
  User: 'user',
  UserLikeHistory: 'user_like_history'
}


export default {
  Language,
  Theme,
  Route,
  StorageField,
}
