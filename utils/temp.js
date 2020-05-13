
// import marked from 'marked'
// import Hljs from '~/plugins/highlight'

// var gravatar = require('gravatar');
// var url = gravatar.url('dongkirk1992@gmail.com');
// console.log(url)


// // var marked =require('marked')



// function A(){

// }
// A.prototype.n=1
// var b =new A()
// A.prototype={
//   n:2,
//   m:3
// }
// var c=new A()
// console.log(b.n,b.m,c.n,c.m) //1 ,undefined,2,3

// function F(){}

// Object.prototype.a=function(){
//   console.log('a()')
// }

// Function.prototype.b=function(){
//   console.log("b()")
// }
// var f= new F()
// f.a()
// f.b()
// F.a()
// F.b()

// var name = "window"
// var object = {
//   name: "obj",
//   getNameFunc: function () {
//     return function () {
//       return this.name;
//     }
//   }

// }
// console.log(object.getNameFunc()())


// var name2 = "window"
// var object2 = {
//   name: "obj",
//   getNameFunc: function () {
//     var that = this
//     return function () {
//       return this.name;
//     }
//   }

// }
// console.log(object2.getNameFunc()())

// function fun(n, o) {
//   console.log(o)
//   return {
//     fun: function (m) {
//       return fun(m, n)
//     }
//   }
// }
// var a = fun(0); a.fun(1); a.fun(2); a.fun(3) //undefined 0 0 0
// // var a1=fun(0); var a2=a1.fun(1);var a3=a2.fun(2) ;var a4=a3.fun(2)
// var b = fun(0).fun(1).fun(2).fun(3)//undefined 0 1 2
// var c = fun(0).fun(1); c.fun(2); c.fun(3) //undefined 0 1 1




// function onclick1(e) {
//   console.log("执行函数", e.target)
// }

// function throttle(fn, delay) {
//   // console.log(throttle)
//   let start = 0
//   return function () {
//     const current = Date.now()
//     if (current - start > delay) {
//       fn.apply(this, arguments)
//       start = current
//     }
//   }
// }

// function debounce(fn, delay) {
//   let timeoutId = null
//   console.log("debounce已被运行")
//   return function () {
//     //console.log("this:",this,'arguments:',arguments)
//     const that = this
//     const args = arguments
//     if (timeoutId) {
//       //console.log('删除定时器')
//       clearTimeout(timeoutId)
//     }
//     timeoutId = setTimeout(() => { console.log('运行需要运行的函数'); fn.apply(that, args) }, delay)
//   }
// }

// // document.getElementById('btn1').onclick=throttle(onclick1 ,1000)
// btn1 = document.getElementById('btn1')
// btn1.addEventListener('click', throttle(onclick1, 1000), false);
// btn2 = document.getElementById('btn2')
// btn2.addEventListener('click', debounce(onclick1, 1000), false);


// const p = new Promise((resolve, reject) => { // 1)同步执行的执行器函数
//   // 2) 在执行器函数中启动异步任务
//   setTimeout(() => {
//     // 3) 根据结果做不同处理
//     const time = Date.now()
//     // 3.1) 如果成功了, 调用resolve(), 指定成功的value, 变为resolved状态
//     if (time % 2 == 1) {
//       resolve('成功的数据 ' + time)
//       console.log('resolve()之后')
//     } else {//     3.2) 如果失败了, 调用reject(), 指定失败的reason, 变为rejected状态
//       reject('失败的数据 ' + time)
//     }
//   }, 1000);
// })

// // 4) 能promise指定成功或失败的回调函数来获取成功的vlaue或失败的reason
// p.then(
//   value => {
//     console.log('成功', value)
//   },
//   error => {
//     console.log('失败', error)
//   }
// )



// new Promise((resolve, reject) => { // 同步回调
//   console.log('excutor()')
//   // 启动异步任务
//   setTimeout(() => {
//     resolve(1)  // pending ==> resolved  value为1
//     console.log('resolve()改变状态后')
//     // reject()
//   }, 3000)
// }).then( // 先指定回调函数, 内部选将回调函数保存起来
//   value => { // 成功/失败的回调函数是异步执行的, 需要放入队列将来执行
//     console.log('onResolved()', value)
//   }
// )
// console.log('new Promise()之后')


// new Promise((resolve, reject) => { // 同步回调
//   console.log('excutor()')
//   resolve(1)  // pending ==> resolved  value为1
//   console.log('resolve()改变状态后')
// }).then( // 先指定回调函数, 内部选将回调函数保存起来
//   value => { // 成功/失败的回调函数是异步执行的, 需要放入队列将来执行
//     console.log('onResolved()', value)
//   }
// )
// console.log('new Promise()之后')


/* 常规: 先指定回调函数, 后改变状态 */
// const p = new Promise((resolve, reject) => { // 同步回调
//   console.log('excutor()')
//   // 启动异步任务
//   setTimeout(() => {
//     resolve(1)  // pending ==> resolved  value为1
//     console.log('resolve()改变状态后')
//     // reject()
//   }, 1000)
// })

// setTimeout(() => {
//   p.then( // 先指定回调函数, 内部选将回调函数保存起来
//     value => { // 成功/失败的回调函数是异步执行的, 需要放入队列将来执行
//       console.log('onResolved()', value)
//     }
//   )
// }, 5000);
// console.log('new Promise()之后')


// new Promise((resolve, reject) => {
//   // 启动任务1(异步)
//   console.log('启动任务1(异步)')
//   setTimeout(() => {
//     resolve(1)
//   }, 1000)
// }).then(value => {
//   console.log('任务1成功的value为', value)
//   // 执行任务2(同步)
//   console.log('执行任务2(同步)')
//   return 2
// }).then(value => {
//   console.log('任务2成功的vlaue为', value)
//   // 执行任务3(异步)
//   return new Promise((resolve, reject) => {
//     console.log('调动任务3(异步)')
//     setTimeout(() => {
//       resolve(3)
//     }, 1000);
//   })
// }).then(value => {
//   console.log('任务3成功的value为: ', value)
// })


// new Promise((resolve, reject) => {
//   // resolve(1)
//   reject(2)
// }).then(
//   value => console.log('onResolved1()', value),
//   // reason => {throw reason}
// ).then(
//   value => console.log('onResolved2()', value),
//  // reason => Promise.reject(reason)
// ).then(
//   value => console.log('onResolved3()', value),
//   // reason => {throw reason}
// ).catch(reason => {
//   console.log('onRejected1()', reason)
//   // throw reason
//   return new Promise(() => {}) // 返回一个pending状态的promise ==> 中断promise链接
// }).then(
//   value => console.log('onResolved4()', value),
//   reason => console.log('onRejected2()', reason)
// )


async function async1() {
  console.log('async1 start')
  await async2()  // async2().then(() => {})
  console.log('async1 end')
}

async function async2() {
  console.log('async2')
}

console.log('script start')

setTimeout(() => {
  console.log('setTimeout')
}, 0)

async1()

new Promise(function (resolve) {
  console.log('promise1')
  resolve()
}).then(function () {
  console.log('promise2')
})
console.log('script end')
