
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

function fun(n, o) {
  console.log(o)
  return {
    fun: function (m) {
      return fun(m, n)
    }
  }
}
var a = fun(0); a.fun(1); a.fun(2); a.fun(3) //undefined 0 0 0
// var a1=fun(0); var a2=a1.fun(1);var a3=a2.fun(2) ;var a4=a3.fun(2)
var b = fun(0).fun(1).fun(2).fun(3)//undefined 0 1 2
var c = fun(0).fun(1); c.fun(2); c.fun(3) //undefined 0 1 1




function onclick1(e) {
  console.log("执行函数", e.target)
}

function throttle(fn, delay) {
  // console.log(throttle)
  let start = 0
  return function () {
    const current = Date.now()
    if (current - start > delay) {
      fn.apply(this, arguments)
      start = current
    }
  }
}

function debounce(fn, delay) {
  let timeoutId = null
  console.log("debounce已被运行")
  return function () {
    //console.log("this:",this,'arguments:',arguments)
    const that = this
    const args = arguments
    if (timeoutId) {
      //console.log('删除定时器')
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => { console.log('运行需要运行的函数'); fn.apply(that, args) }, delay)
  }
}

// document.getElementById('btn1').onclick=throttle(onclick1 ,1000)
btn1 = document.getElementById('btn1')
btn1.addEventListener('click', throttle(onclick1, 1000), false);
btn2 = document.getElementById('btn2')
btn2.addEventListener('click', debounce(onclick1, 1000), false);
