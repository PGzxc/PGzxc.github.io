---
title: Web前端高频面试题——JavaScript(2)
categories:
  - 面试相关
  - Web前端面试题
tags:
  - Web前端面试题
abbrlink: 27712fd6
date: 2025-10-21 09:25:26
---
## 一 概述

```
本文题目来自于：
 - 面试招聘要求
 - 网友分享
```

<!--more-->

## 二  面试要求和面试题

```
1.变量声明：var/let/const
2.数据类型：基本 vs 引用，null vs undefined
3.值/引用传递：浅拷贝 vs 深拷贝
4.运算符：== vs ===
5.闭包：原理与应用
6.原型链与继承机制
7.this 绑定：规则与箭头函数区别
8.事件机制：冒泡、捕获、阻止冒泡
9.异步编程：Promise、async/await、回调、事件循环（宏任务/微任务）
10.函数式编程：高阶函数、纯函数、柯里化
```

### 三 面试题解答(仅供参考)

### 3.1 变量声明

面试考点

```
1.var: 函数作用域，存在变量提升（hoisting），允许重复声明和重新赋值，易导致作用域问题。
2.let: 块级作用域，无变量提升，存在暂时性死区（TDZ），不可重复声明，可重新赋值。
3.const: 块级作用域，无变量提升，存在 TDZ，不可重复声明，不可重新赋值（引用类型可修改内部属性）。
```

1、var、let 和 const 的区别？

```
1、概念
var: 函数作用域，变量提升，允许重复声明，初始化为 undefined。
let: 块级作用域，TDZ，适合需要重新赋值的场景（如循环计数器）。
const: 块级作用域，声明时必须初始化，适合常量或引用类型（如配置对象）。
应用场景: 优先用 const，需重新赋值时用 let，避免 var 以减少作用域问题。

2、代码示例:
var x = 1;
if (true) {
  var x = 2; // 覆盖全局 x
  let y = 3; // 块级作用域
}
console.log(x); // 2
console.log(y); // ReferenceError
const obj = { a: 1 };
obj.a = 2; // 允许修改属性
```

2、变量提升如何影响 var、let 和 const？

```
1、概念
var: 声明提升，初始化为 undefined。
let/const: 声明提升但存在 TDZ，访问前抛 ReferenceError。

2、代码示例:
console.log(a); // undefined
var a = 1;
console.log(b); // ReferenceError
let b = 2;

3、重点

优先使用 const 和 let，var 已不推荐。
注意 TDZ 和 const 引用类型的可修改性。
```

### 3.2 数据类型

面试考点

```
1.基本类型: number、string、boolean、null、undefined、symbol、bigint，按值存储，比较值。
2.引用类型: object（包括 array、function 等），按引用存储，比较地址。
3.null vs undefined:

-undefined: 变量声明未初始化、函数无返回值、对象属性不存在。
-null: 主动设为空对象指针。
-比较: null == undefined 为 true，null === undefined 为 false。
```

1、基本类型和引用类型的区别？

```
1、概念
基本类型值不可变，按值传递；引用类型存储地址，修改影响原对象。

2、代码示例:
let a = 1, b = a;
b = 2;
console.log(a); // 1
let obj1 = { x: 1 }, obj2 = obj1;
obj2.x = 2;
console.log(obj1.x); // 2
```

2、null 和 undefined 的区别？

```
1、概念
undefined: 表示“缺少值”，默认未初始化。
null: 表示“无对象”，常用于重置。

2、代码示例:
console.log(typeof null); // "object" (历史遗留 bug)
console.log(null == undefined); // true
console.log(null === undefined); // false

3、重点
注意 typeof null 的历史遗留问题。
引用类型操作需小心，避免意外修改。
```

### 3.3 值/引用传递

面试考点

```
1.值传递: 基本类型传递值副本，互不影响。
2.引用传递: 引用类型传递地址副本，修改影响原对象。
3.浅拷贝: 复制顶层属性，嵌套对象共享引用（如 Object.assign, ...）。
4.深拷贝: 递归复制所有层（如 JSON.parse(JSON.stringify(obj)), lodash cloneDeep）。
```

1、JavaScript 是按值传递还是按引用传递？

```
统一按值传递，基本类型传递值，引用类型传递地址副本
```

2、浅拷贝和深拷贝的区别及实现？

```
1、概念
浅拷贝只复制顶层，深拷贝复制所有层。

2、实现:
-浅拷贝: Object.assign({}, obj) 或 { ...obj }
-深拷贝: JSON.parse(JSON.stringify(obj))（有限制）或递归函数。

3、代码示例:
let obj = { a: 1, b: { c: 2 } };
let shallow = { ...obj };
let deep = JSON.parse(JSON.stringify(obj));
shallow.b.c = 3;
console.log(obj.b.c); // 3
deep.b.c = 4;
console.log(obj.b.c); // 3

4、重点
深拷贝需处理循环引用、特殊类型。
浅拷贝性能高但易导致意外修改。
```

### 3.4 运算符

面试考点

```
1.==: 松散相等，进行类型转换，规则复杂。
2.===: 严格相等，值和类型必须相同，推荐使用。
```

1、== 和 === 的区别？

```
1、概念
==: 转换类型后比较，可能导致意外结果（如 [] == 0 为 true）。
===: 不转换类型，推荐优先使用。

2、代码示例
console.log('1' == 1); // true
console.log('1' === 1); // false
console.log([] == 0); // true
```

2、== 类型转换规则？

```
1、概念
优先转数字，对象调用 valueOf 或 toString。
示例: [] == 0 中，[] 转为 ''，再转为 0。

2、重点
优先使用 ===，仅在明确需要类型转换（如 value == null）时用 ==。
```

### 3.5 闭包

面试考点

```
1.闭包: 函数记住并访问其外部词法作用域的变量，即使外部函数执行结束。
2.原理: 词法作用域链，外部变量被引用后不被垃圾回收。
3.应用: 私有变量、工厂函数、节流/防抖。
```

1、什么是闭包？原理是什么？

```
1、概念
闭包是函数与其外部词法环境的组合，依赖作用域链实现。

2、代码示例:
function createCounter() {
  let count = 0;
  return () => count++;
}
const counter = createCounter();
console.log(counter()); // 0
console.log(counter()); // 1
```

2、闭包的应用场景？

```
1、概念
数据私有化、模块化、节流/防抖、柯里化。

2、代码示例（节流）:
function throttle(fn, wait) {
  let last = 0;
  return function () {
    const now = Date.now();
    if (now - last > wait) {
      fn.apply(this, arguments);
      last = now;
    }
  };
}

3、重点
闭包可能导致内存泄漏，需谨慎管理。
常用于封装和状态保持。
```

### 3.6 原型链与继承机制

面试考点

```
1.原型链: 对象通过 __proto__ 链接到原型，属性查找沿链向上。
2.继承: 通过设置 prototype 或 ES6 class/extends 实现。
3.ES6 前: 组合继承、寄生组合继承。
4.ES6: class/extends 语法糖。
```

1、原型链如何工作？

```
1、概念
属性查找沿 __proto__ 链到 Object.prototype 或 null。

2、代码示例:
function Person() {}
Person.prototype.say = () => console.log("Hi");
const p = new Person();
p.say(); // Hi
```

2、继承的实现方式？

```
1、概念
ES6 前: Child.prototype = new Parent()（需重置 constructor）。
ES6: class Child extends Parent {}。

2、代码示例:
class Parent { say() { return "Parent"; } }
class Child extends Parent {}
console.log(new Child().say()); // Parent

3、重点

原型链是继承核心，注意共享问题。
ES6 class 更直观但仍基于原型。
```

### 3.7 this 绑定

面试考点

```
1、this 绑定规则:
-默认绑定: 全局（window/undefined）。
-隐式绑定: 调用对象。
-显式绑定: call/apply/bind。
-new 绑定: 新实例。

2、箭头函数: 无自身 this，继承外层词法作用域的 this。
```

1、this 的绑定规则？

```
1、概念
取决于调用上下文，优先级: new > 显式 > 隐式 > 默认。

2、代码示例:
javascriptconst obj = { x: 1, fn() { console.log(this.x); } };
obj.fn(); // 1
const fn = obj.fn;
fn(); // undefined (严格模式)
```

2、箭头函数的 this 与普通函数区别？

```
1、概念
箭头函数的 this 在定义时绑定，无法通过 call/apply/bind 改变。

2、代码示例:
const obj = {
  x: 1,
  fn: () => console.log(this.x),
  fn2() { console.log(this.x); }
};
obj.fn(); // undefined
obj.fn2(); // 1


3、重点
-箭头函数适合回调，避免 this 动态变化。
-注意严格模式下默认绑定的 undefined
```

### 3.8 事件机制

面试考点

```
1、事件流: 捕获（根到目标）→ 目标 → 冒泡（目标到根）。
2、阻止方法:
-e.stopPropagation(): 阻止冒泡/捕获。
-e.preventDefault(): 阻止默认行为。
-e.stopImmediatePropagation(): 阻止后续监听器。
```

1、事件冒泡和捕获的区别？

```
1、概念
捕获从外到内，冒泡从内到外，默认冒泡。

2、代码示例:
document.querySelector("div").addEventListener("click", () => console.log("capture"), true);
document.querySelector("div").addEventListener("click", () => console.log("bubble"));
```

2、如何阻止事件传播？

```
1、概念
用 e.stopPropagation() 阻止传播，e.preventDefault() 阻止默认行为。

2、代码示例:
document.querySelector("a").addEventListener("click", (e) => {
  e.preventDefault(); // 阻止跳转
  e.stopPropagation(); // 阻止冒泡
});

3、重点
-默认冒泡，捕获需明确指定。
-注意区分 stopPropagation 和 preventDefault。
```

### 3.9 异步编程

面试考点

```
1.事件循环: 单线程，同步 → 微任务（Promise.then）→ 宏任务（setTimeout）。
2.回调: 传统异步，易导致回调地狱。
3.Promise: 对象化异步，状态管理（pending/fulfilled/rejected）。
4.async/await: Promise 语法糖，同步风格。
```

1、事件循环、宏任务和微任务的区别？

```
1、概念
宏任务: setTimeout、setInterval、I/O。
微任务: Promise.then、MutationObserver。
循环: 同步 → 微任务 → 渲染 → 宏任务。

2、代码示例:
console.log(1);
setTimeout(() => console.log(2));
Promise.resolve().then(() => console.log(3));
console.log(4);
// 输出: 1, 4, 3, 2
```

2、Promise、async/await 和回调的区别？

```
1、概念
回调: 嵌套复杂，错误处理麻烦。
Promise: 链式调用，统一错误处理。
async/await: 更简洁，适合复杂异步逻辑。

2、代码示例:
async function fetchData() {
  try {
    const res = await fetch("url");
    return await res.json();
  } catch (e) {
    console.error(e);
  }
}

3、重点

-微任务优先于宏任务。
-async/await 提高代码可读性
```

### 3.10 函数式编程

面试考点

```
1.纯函数: 相同输入相同输出，无副作用。
2.高阶函数: 接受/返回函数（如 map、filter）。
3.柯里化: 多参数函数转为单参数函数链。
```

1、纯函数和高阶函数是什么？

```
1、概念
纯函数: 确定性、无副作用，易测试。
高阶函数: 增强复用性，如 array.map(x => x * 2)。

2、代码示例:
const add = (a, b) => a + b; // 纯函数
const map = (fn, arr) => arr.map(fn); // 高阶函数
```

2、柯里化的定义和实现？

```
1、概念
将 f(a, b) 转为 f(a)(b)，利用闭包。

2、代码示例:
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn(...args);
    return (...next) => curried(...args, ...next);
  };
}
const add = curry((a, b) => a + b);
console.log(add(1)(2)); // 3

3、重点

-纯函数提高可测试性。
-柯里化适合参数复用和延迟执行。
```
